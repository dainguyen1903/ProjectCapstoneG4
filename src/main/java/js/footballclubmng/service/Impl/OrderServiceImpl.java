package js.footballclubmng.service.Impl;

import js.footballclubmng.config.TokenProvider;
import js.footballclubmng.entity.*;
import js.footballclubmng.enums.EOrderStatus;
import js.footballclubmng.enums.EShipStatus;
import js.footballclubmng.model.dto.OrderDto;
import js.footballclubmng.model.dto.ShippingDto;
import js.footballclubmng.model.request.order.CreateOrderRequest;
import js.footballclubmng.model.request.shipping.ShippingRequest;
import js.footballclubmng.repository.*;
import js.footballclubmng.service.CartService;
import js.footballclubmng.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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
    public List<Order> getAllOrder() {
        List<Order> list = orderRepository.findAll();
        return list;
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

        //Tạo shipping từ orderRequest
        ShippingRequest shippingRequest = createOrderRequest.getShipping();
        Shipping shipping = new Shipping();
        shipping.setShipName(shippingRequest.getShipName());
        shipping.setPhone(shippingRequest.getPhone());
        shipping.setAddress(shippingRequest.getAddress());
        shipping.setNote(shippingRequest.getNote());
        shipping.setCreateAt(LocalDateTime.now());
        shipping.setUpdateAt(LocalDateTime.now());
        shipping.setStatus(EShipStatus.PENDING);
        shipping = shippingRepository.save(shipping);

        //Tạo order
        Order order = new Order();
        order.setUser(user);
        order.setShipping(shipping);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus(EOrderStatus.PENDING);

        // Lưu Order vào cơ sở dữ liệu để có ID
        order = orderRepository.save(order);

        // Tạo danh sách OrderDetail từ danh sách CartItem và thông tin người dùng từ cart
        List<OrderDetail> orderDetailList = new ArrayList<>();
        float totalPrice = 0.0f; // Khởi tạo tổng giá tiền của đơn hàng
        for(CartItem cartItem : cartItems) {
            Product product = cartItem.getProduct();
            float originalPrice = product.getPrice();
            float discount = product.getDiscount(); // Lấy phần trăm khuyến mãi từ sản phẩm
            float discountedPrice = originalPrice * (1 - discount); // Áp dụng khuyến mãi vào giá tiền

            OrderDetail orderDetail = new OrderDetail();
            orderDetail.setProduct(cartItem.getProduct());
            orderDetail.setQuantity(cartItem.getQuantity());
            orderDetail.setSize(cartItem.getSize());
            orderDetail.setUnitPrice(discountedPrice);
            orderDetail.setOrder(order);
            orderDetailList.add(orderDetail);

            // Tính tổng giá tiền cho đơn hàng sau khi áp dụng khuyến mãi
            totalPrice += discountedPrice * cartItem.getQuantity();
        }

        // Gán tổng giá tiền cho đơn hàng
        order.setTotalPrice(totalPrice);

        // Liên kết danh sách OrderDetail với Order
        order.setOrderDetailList(orderDetailList);

        // Lưu Order vào cơ sở dữ liệu
        order = orderRepository.save(order);

        // Xóa cart sau khi tạo đơn hàng thành công
        cartService.deleteCartByToken(token);

        return order;
    }

}
