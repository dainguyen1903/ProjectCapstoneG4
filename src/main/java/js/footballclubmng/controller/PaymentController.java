package js.footballclubmng.controller;


import js.footballclubmng.common.CommonConstant;
import js.footballclubmng.model.request.PaymentRequest;
import js.footballclubmng.model.response.PaymentResponse;
import js.footballclubmng.model.response.ResponseAPI;
import js.footballclubmng.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;
import org.springframework.web.util.UriComponentsBuilder;


@RestController
public class PaymentController {

    @Autowired
    PaymentService paymentService;
    @PostMapping(CommonConstant.PAYMENT_API.CREATE_PAYMENT)
    public ResponseAPI<?> createPayment(@RequestBody PaymentRequest paymentRequest, @RequestHeader(name = "Authorization") String token)  {
        try {
            PaymentResponse response = paymentService.createPayment(paymentRequest, token);
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, CommonConstant.COMMON_MESSAGE.CREATE_PAYMENT_SUCCESS, response);
        } catch (Exception e) {
            // Trả về thông báo lỗi nếu có bất kỳ ngoại lệ nào xảy ra
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.CREATE_PAYMENT_FAIL);
        }

    }

    @GetMapping(CommonConstant.PAYMENT_API.TRANSACTION_PAYMENT)
    public RedirectView transaction(@RequestParam(value = "vnp_ResponseCode") String responseCode,
                                    @RequestParam(value = "vnp_TxnRef") String orderIdStr) {
        String frontendUrl = "http://localhost:3000/order";
        Long orderId = Long.valueOf(orderIdStr); // Chuyển đổi orderId từ String sang Long
        if (responseCode.equals("00")) {
            //execute update status of order COMPLETE
            paymentService.updateStatusOrderSuccess(orderId, true);
            // URL của trang frontend

            UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(frontendUrl)
                    .queryParam("transactionId", orderId)
                    .queryParam("orderSuccess", true);
            return new RedirectView(builder.toUriString());
        } else {
            //execute update status of order FAILED
            paymentService.updateStatusOrderSuccess(orderId, false);
            UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(frontendUrl)
                    .queryParam("transactionId", orderId)
                    .queryParam("orderSuccess", false);
            return new RedirectView(builder.toUriString());
        }
    }


}
