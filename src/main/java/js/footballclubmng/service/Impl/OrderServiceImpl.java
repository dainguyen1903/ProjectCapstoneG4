package js.footballclubmng.service.Impl;

import js.footballclubmng.common.CommonConstant;
import js.footballclubmng.common.MapperUtil;
import js.footballclubmng.config.TokenProvider;
import js.footballclubmng.entity.*;
import js.footballclubmng.enums.EOrderStatus;
import js.footballclubmng.enums.EShipStatus;
import js.footballclubmng.model.dto.OrderDetailDto;
import js.footballclubmng.model.dto.OrderDto;
import js.footballclubmng.model.dto.ShippingDto;
import js.footballclubmng.model.request.order.CreateOrderRequest;
import js.footballclubmng.model.request.shipping.ShippingRequest;
import js.footballclubmng.model.response.ResponseAPI;
import js.footballclubmng.repository.*;
import js.footballclubmng.service.CartService;
import js.footballclubmng.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

import static js.footballclubmng.common.MapperUtil.mapToOrderDto;

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

    @Override
    public List<OrderDto> getAllOrder() {
        // Lấy danh sách tất cả các đơn hàng từ repository
        List<Order> listOrder = orderRepository.findAll();

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
        if(cart == null || cart.getCartItems() == null || cart.getCartItems().isEmpty()) {
            return null;
        }

        //Tạo shipping từ orderRequest
        ShippingRequest shippingRequest = createOrderRequest.getShipping();
        Shipping shipping = new Shipping();
        shipping.setShipName(shippingRequest.getShipName());
        shipping.setPhone(shippingRequest.getPhone());
        shipping.setAddress(shippingRequest.getAddress());
        shipping.setNote(shippingRequest.getNote());
        shipping.setCreateAt(LocalDateTime.now());
        shipping.setUpdateAt(LocalDateTime.now());
        shipping.setShipperId(3L);
        shipping.setStatus(EShipStatus.PENDING);

        // Tính toán totalPrice
        float totalPrice = calculateTotalPrice(cartItems);
        shipping.setTotalPrice(totalPrice);

        shipping = shippingRepository.save(shipping);


        //Tạo order
        Order order = new Order();
        order.setShippingId(shipping.getId());
        order.setUserId(user.getId());
        order.setOrderDate(LocalDateTime.now());
        order.setPaymentMethod(createOrderRequest.getPaymentMethod());
        order.setStatus(EOrderStatus.PENDING);

        // Lưu Order vào cơ sở dữ liệu để có ID
        order = orderRepository.save(order);

        // Tạo danh sách OrderDetail từ danh sách CartItem và thông tin người dùng từ cart
        List<OrderDetail> orderDetailList = new ArrayList<>();
        for(CartItem cartItem : cartItems) {

            OrderDetail orderDetail = new OrderDetail();
            orderDetail.setProductId(cartItem.getProductId());
            orderDetail.setQuantity(cartItem.getQuantity());
            orderDetail.setSize(cartItem.getSize());
            orderDetail.setUnitPrice(totalPrice);
            orderDetail.setOrderId(order.getId());
            orderDetailList.add(orderDetail);

        }

        // Gán tổng giá tiền cho đơn hàng
        order.setTotalPrice(totalPrice);

        // Gán tồng giá tiền cho đơn ship
        shipping.setTotalPrice(totalPrice);

        // Liên kết danh sách OrderDetail với Order
        order.setOrderDetailList(orderDetailList);

        order = orderRepository.save(order);

        // Xóa cart sau khi tạo đơn hàng thành công
        cartService.deleteCartByToken(token);

        return order;
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

    @Override
    public List<OrderDto> getOrderByUserId(Long userId) {
        List<Order> listOrderByUser = orderRepository.findByUserId(userId);
        return listOrderByUser.stream()
                .map(MapperUtil::mapToOrderDto)
                .collect(Collectors.toList());
    }


}
