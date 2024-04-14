package js.footballclubmng.service.Impl;

import js.footballclubmng.config.TokenProvider;
import js.footballclubmng.config.VNPayConfig;
import js.footballclubmng.entity.Order;
import js.footballclubmng.entity.OrderDetail;
import js.footballclubmng.entity.User;
import js.footballclubmng.enums.EOrderStatus;
import js.footballclubmng.model.request.PaymentRequest;
import js.footballclubmng.model.response.PaymentResponse;
import js.footballclubmng.repository.OrderRepository;
import js.footballclubmng.repository.UserRepository;
import js.footballclubmng.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderRepository orderRepository;
    @Override
    public PaymentResponse createPayment(PaymentRequest request, String token) throws UnsupportedEncodingException {
        // Lấy thông tin người dùng từ token
        String jwtToken = token.substring(7);
        String email = tokenProvider.getUsernameFromJWT(jwtToken);
        User user = userRepository.findByEmail(email);

        Order order = orderRepository.findByIdAndUserId(request.getOrderId(), user.getId());


        String vnp_TmnCode = VNPayConfig.vnp_TmnCode;

        long totalPrice = (long) order.getTotalPrice();
        totalPrice *= 100;


        Map<String, String> VNPAYParams = VNPayConfig.buildParams();
        VNPAYParams.put("vnp_TxnRef", order.getId().toString());
        VNPAYParams.put("vnp_OrderInfo", "Thanh toán đơn hàng: " + order.getUser().getFirstName() + " " + order.getUser().getLastName()) ;
        VNPAYParams.put("vnp_Amount", String.valueOf(totalPrice));
        VNPAYParams.put("vnp_BankCode", "NCB");//NCB default

        PaymentResponse paymentResponse = new PaymentResponse();
        paymentResponse.setStatus("Ok");
        paymentResponse.setMessage("Successfully");
        paymentResponse.setPaymentUrl(VNPayConfig.getUrl(VNPAYParams));

        return paymentResponse;
    }

    public void updateStatusOrderSuccess(Long orderId, boolean isSuccess) {
        // Tìm kiếm đơn hàng trong cơ sở dữ liệu bằng orderId
        Order order = orderRepository.findById(orderId).orElseThrow();
        if (isSuccess) {
            order.setStatus(EOrderStatus.IN_PROGRESS);
        } else {
            order.setStatus(EOrderStatus.FAILED);
        }
        orderRepository.save(order);
    }
}

