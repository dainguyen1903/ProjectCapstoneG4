package js.footballclubmng.controller;

import js.footballclubmng.common.CommonConstant;
import js.footballclubmng.entity.Order;
import js.footballclubmng.enums.EOrderMethod;
import js.footballclubmng.enums.EOrderStatus;
import js.footballclubmng.model.dto.OrderDetailDto;
import js.footballclubmng.model.dto.OrderDto;
import js.footballclubmng.model.dto.OrderHistoryDto;
import js.footballclubmng.model.request.PaymentRequest;
import js.footballclubmng.model.request.order.CreateOrderRequest;
import js.footballclubmng.model.response.ListShippingResponse;
import js.footballclubmng.model.response.OrderDetailResponse;
import js.footballclubmng.model.response.PaymentResponse;
import js.footballclubmng.model.response.ResponseAPI;
import js.footballclubmng.service.OrderDetailService;
import js.footballclubmng.service.OrderService;
import js.footballclubmng.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.io.UnsupportedEncodingException;
import java.util.List;

@RestController
public class OrderController {
    @Autowired
    OrderService orderService;
    @Autowired
    PaymentService paymentService;

    @Autowired
    OrderDetailService orderDetailService;

    @GetMapping(CommonConstant.ORDER_API.LIST_ORDER)
    @PreAuthorize("hasRole('ROLE_Sale')")
    public ResponseAPI<List<OrderDto>> listOrder() {
        List<OrderDto> list = orderService.getAllOrder();
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, null, list);
    }

    @GetMapping(CommonConstant.ORDER_API.VIEW_ORDER_DETAILS)
    public ResponseAPI<OrderDetailResponse> viewOrderDetails(@PathVariable Long orderId) {
        try {
            OrderDetailResponse orderDetailResponse = orderService.getOrderDetail(orderId);
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, null, orderDetailResponse);
        } catch (Exception e) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, e.getMessage());
        }
    }


    @PostMapping(CommonConstant.ORDER_API.CREATE_ORDER)
    @PreAuthorize("hasRole('ROLE_User')")
    public ResponseAPI<?> createOrder(@RequestBody CreateOrderRequest createOrderRequest, @RequestHeader(name = "Authorization") String token) {
        try {
            Order order = orderService.createOrder(createOrderRequest, token);
            if (order == null) {
                return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.CREATE_ORDER_FAIL);
            }
            Long orderId = order.getId();
            if (createOrderRequest.getPaymentMethod().equals(EOrderMethod.VNPAY)) {
                PaymentRequest request = new PaymentRequest();
                request.setOrderId(orderId);
                PaymentResponse response = paymentService.createPayment(request, token);
                return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, CommonConstant.COMMON_MESSAGE.CREATE_PAYMENT_SUCCESS, response);
            } else {
                return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, CommonConstant.COMMON_MESSAGE.CREATE_ORDER_SUCCESS, orderId);
            }

        } catch (ResponseStatusException | UnsupportedEncodingException ex) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, ex.getMessage());
        }

    }

    @GetMapping(CommonConstant.ORDER_API.HISTORY_ORDER)
    @PreAuthorize("hasRole('ROLE_User')")
    public ResponseAPI<List<OrderHistoryDto>> listOrderByUser(@RequestHeader(name = "Authorization") String token) {
        List<OrderHistoryDto> list = orderService.getHistoryOrder(token);
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, null, list);
    }

    @PostMapping(CommonConstant.ORDER_API.CANCEL_ORDER)
    public ResponseAPI<Void> cancelOrder(@PathVariable Long orderId) {
        try {
            orderService.cancelOrder(orderId);
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, CommonConstant.COMMON_MESSAGE.CANCEL_ORDER);
        } catch (Exception e) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, e.getMessage());
        }

    }


    @PostMapping(CommonConstant.ORDER_API.CONFIRM_ORDER)
    public ResponseAPI<Void> confirmOrder(@PathVariable Long orderId) {
        try {
            orderService.confirmOrder(orderId);
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, CommonConstant.COMMON_MESSAGE.CONFIRM_ORDER);
        } catch (Exception e) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, e.getMessage());
        }

    }

    @GetMapping(CommonConstant.ORDER_API.LIST_ORDER_BY_SHIPPER)
    public ResponseAPI<List<OrderDto>> listOrderByShipper(@RequestHeader(name = "Authorization") String token) {
        List<OrderDto> listOrderByShipper = orderService.listOrderByShipper(token);
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, null, listOrderByShipper);
    }

    @PutMapping(CommonConstant.ORDER_API.UPDATE_STATUS_ORDER_BY_SHIPPER)
    public ResponseAPI<Void> updateStatusOrderByShipper(@PathVariable Long orderId, @RequestParam EOrderStatus status) {
        try {
            orderService.updateStatusOrderByShipepr(orderId, status);
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, CommonConstant.COMMON_MESSAGE.UPDATE_STATUS_ORDER_SUCCESS);
        } catch (Exception e) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, e.getMessage());
        }

    }


}
