package js.footballclubmng.service.Impl;

import js.footballclubmng.util.MapperUtil;
import js.footballclubmng.config.TokenProvider;
import js.footballclubmng.entity.*;
import js.footballclubmng.enums.EOrderMethod;
import js.footballclubmng.enums.EOrderStatus;
import js.footballclubmng.model.dto.OrderDto;
import js.footballclubmng.model.dto.OrderHistoryDto;
import js.footballclubmng.model.request.order.CreateOrderRequest;
import js.footballclubmng.model.request.shipping.ShippingRequest;
import js.footballclubmng.repository.*;
import js.footballclubmng.service.CartService;
import js.footballclubmng.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.apache.commons.lang3.RandomStringUtils;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    OrderRepository orderRepository;
    @Autowired
    private TokenProvider tokenProvider;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CartItemRepository cartItemRepository;
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private ShippingRepository shippingRepository;
    @Autowired
    private CartService cartService;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ProductSizeRepository productSizeRepository;

    @Override
    public List<OrderDto> getAllOrder() {
        // Lấy danh sách tất cả các đơn hàng từ repository
        List<Order> listOrder = orderRepository.findAllByOrderByOrderDateDesc();

        // Chuyển đổi danh sách đơn hàng thành danh sách DTO bằng cách sử dụng mapper
        return listOrder.stream()
                .map(MapperUtil::mapToOrderDto)
                .collect(Collectors.toList());
    }

    @Override
    public Order createOrder(CreateOrderRequest createOrderRequest, String token) {
        String jwtToken = token.substring(7);
        String email = tokenProvider.getUsernameFromJWT(jwtToken);
        User user = userRepository.findByEmail(email);
        // Lấy thông tin người dùng từ cart
        Cart cart = cartRepository.findByUser(user);
        // Lấy danh sách CartItem của người dùng từ cart
        List<CartItem> cartItems = cart.getCartItems();
        if (cart == null || cart.getCartItems() == null || cart.getCartItems().isEmpty()) {
            return null;
        }
        //Tạo orderCode random
        String orderCode = generateOrderCode();
        Shipping shipping = createShipping(createOrderRequest, cart);
//      Tạo order
        Order order = new Order();
        order.setShippingId(shipping.getId());
        order.setUserId(user.getId());
        order.setOrderCode(orderCode);
        order.setOrderDate(LocalDateTime.now());
        if (createOrderRequest.getPaymentMethod() == EOrderMethod.VNPAY) {
            order.setPaymentMethod(EOrderMethod.VNPAY);
        } else if (createOrderRequest.getPaymentMethod() == EOrderMethod.COD) {
            order.setPaymentMethod(EOrderMethod.COD);
        }
        order.setStatus(EOrderStatus.PENDING_CONFIRMATION);

        // Lưu Order vào cơ sở dữ liệu để có ID
        order = orderRepository.save(order);

        List<OrderDetail> orderDetailList = createOrderDetailList(cart.getCartItems(), order.getId());

//      Gán tổng giá trị cho đơn hàng
        order.setTotalPrice(shipping.getProductPrice() + shipping.getShippingFee());
//        Liên kết danh sách OrderDetail với Order
        order.setOrderDetailList(orderDetailList);
//
        order = orderRepository.save(order);
        // Xóa cart sau khi tạo đơn hàng thành công
        cartService.deleteCartByToken(token);
        return order;
    }

    private List<OrderDetail> createOrderDetailList(List<CartItem> cartItems, Long orderId) {
        List<OrderDetail> orderDetailList = new ArrayList<>();
        for (CartItem cartItem : cartItems) {

            OrderDetail orderDetail = new OrderDetail();
            orderDetail.setProductId(cartItem.getProductId());
            orderDetail.setQuantity(cartItem.getQuantity());
            orderDetail.setSize(cartItem.getSize());
            orderDetail.setUnitPrice(cartItem.getQuantity() * (cartItem.getProduct().getPrice() * (1 - (cartItem.getProduct().getDiscount() / 100))));
            orderDetail.setOrderId(orderId);
            orderDetailList.add(orderDetail);
        }
        return orderDetailList;
    }

    private Shipping createShipping(CreateOrderRequest createOrderRequest, Cart cart) {
        ShippingRequest shippingRequest = createOrderRequest.getShipping();
        Shipping shipping = new Shipping();
        shipping.setShipName(shippingRequest.getShipName());
        shipping.setPhone(shippingRequest.getPhone());
        shipping.setDistrict(shippingRequest.getDistrict());
        shipping.setWard(shippingRequest.getWard());
        shipping.setProvince(shippingRequest.getProvince());
        shipping.setProductPrice(calculateTotalPrice(cart.getCartItems()));
        if (createOrderRequest.getShipping().getDesiredDeliveryTime()) {
            shipping.setDesiredDeliveryTime(true);
            shipping.setShippingFee((float) 15000);
        } else {
            shipping.setDesiredDeliveryTime(false);
            shipping.setShippingFee((float) 25000);
        }
        shipping.setAddress(shippingRequest.getAddress());
        shipping.setNote(shippingRequest.getNote());
        return shippingRepository.save(shipping);
    }


    private float calculateTotalPrice(List<CartItem> cartItems) {
        float totalPrice = 0.0f;
        for (CartItem cartItem : cartItems) {
            Product product = cartItem.getProduct();
            float originalPrice = product.getPrice();
            float discountPercentage = product.getDiscount(); // Lấy phần trăm khuyến mãi từ sản phẩm
            float discount = discountPercentage / 100.0f; // Chuyển đổi phần trăm thành số thực
            float discountedPrice = originalPrice * (1 - discount); // Áp dụng khuyến mãi vào giá tiền
            totalPrice += discountedPrice * cartItem.getQuantity();
        }
        return totalPrice;
    }

    private String generateOrderCode() {
        String randomNumber = RandomStringUtils.randomNumeric(6);

        return "HLHT" + randomNumber;
    }

    @Override
    public List<OrderHistoryDto> getHistoryOrder(String token) {
        String jwtToken = token.substring(7);
        String email = tokenProvider.getUsernameFromJWT(jwtToken);
        User user = userRepository.findByEmail(email);
        List<Order> listOrderByUser = orderRepository.findByUserIdOrderByOrderDateDesc(user.getId());
        return listOrderByUser.stream()
                .map(order -> MapperUtil.mapToOrderHistoryDto(order, order.getOrderDetailList()))
                .collect(Collectors.toList());
    }

    @Override
    public void confirmOrder(Long orderId) {
        Optional<Order> orderOptional = orderRepository.findById(orderId);
        if (orderOptional.isPresent()) {
            Order order = orderOptional.get();
            EOrderStatus status = order.getStatus();
            if (status == EOrderStatus.PENDING_CONFIRMATION) {
                order.setStatus(EOrderStatus.CONFIRMED);
                orderRepository.save(order);
            } else {
                throw new RuntimeException("Chỉ có thể xác nhận đơn hàng đang chờ, không thể xác nhận đơn hàng với trạng thái " + status);
            }
        }
    }

    @Override
    public void cancelOrder(Long orderId) {
        Optional<Order> orderOptional = orderRepository.findById(orderId);
        if (orderOptional.isPresent()) {
            Order order = orderOptional.get();
            EOrderStatus status = order.getStatus();
            if (status == EOrderStatus.PENDING_CONFIRMATION) {
                order.setStatus(EOrderStatus.CANCELLED);
                orderRepository.save(order);
            } else {
                throw new RuntimeException("Chỉ có thể hủy đơn hàng đang chờ, không thể hủy đơn hàng với trạng thái " + status);
            }
        }

    }

    @Override
    public void updateStatusOrderByShipepr(Long orderId, EOrderStatus status) {
        Order order = orderRepository.findById(orderId).orElse(null);
        if ((status == EOrderStatus.IN_PROGRESS
                || status == EOrderStatus.RETURNED
                || status == EOrderStatus.DELIVERED) && order != null) {
            if (status == EOrderStatus.DELIVERED && order.getStatus() == EOrderStatus.DELIVERED) {
                // Đã giao hàng thành công rồi, không cần phải cập nhật lại
                throw new RuntimeException("Không thể cập nhật trạng thái vì đơn hàng đã giao thành công!!!");
            }

            orderRepository.updateOrderStatus(orderId, status.name());

            if (status == EOrderStatus.DELIVERED) {

                for (OrderDetail orderDetail : order.getOrderDetailList()) {
                    Long productId = orderDetail.getProductId();
                    int orderQuantity = orderDetail.getQuantity();
                    String size = orderDetail.getSize();
                    if (productId != null && orderQuantity > 0 && size != null && !size.isEmpty()) {
                        //Lấy thông tin product size
                        ProductSize productSize = productSizeRepository.findProductSizeByProductIdAndSize(productId, size);
                        if (productSize != null) {
                            int productSizeQuantity = productSize.getQuantity() - orderQuantity;
                            if (productSizeQuantity >= 0) {
                                productSize.setQuantity(productSizeQuantity);
                                productSizeRepository.save(productSize);
                            }
                        }
                    }
                }
            }
        }


    }

    @Override
    public List<OrderDto> listOrderByShipper(String token) {
        String jwtToken = token.substring(7);
        String email = tokenProvider.getUsernameFromJWT(jwtToken);
        User user = userRepository.findByEmail(email);
        List<Order> listOrderByShipper = orderRepository.listOrderByShipper(user.getId());
        return listOrderByShipper.stream()
                .map(MapperUtil::mapToOrderDto)
                .collect(Collectors.toList());

    }


}
