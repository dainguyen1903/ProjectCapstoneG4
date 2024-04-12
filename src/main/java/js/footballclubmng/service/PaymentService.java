package js.footballclubmng.service;

import js.footballclubmng.model.request.PaymentRequest;
import js.footballclubmng.model.response.PaymentResponse;

import java.io.UnsupportedEncodingException;

public interface PaymentService {

    public PaymentResponse createPayment(PaymentRequest request, String token) throws UnsupportedEncodingException;

    void updateStatusOrderSuccess(Long orderId, boolean b);
}
