package js.footballclubmng.controller;

import js.footballclubmng.common.CommonConstant;
import js.footballclubmng.entity.Order;
import js.footballclubmng.entity.Product;
import js.footballclubmng.model.dto.OrderDetailDto;
import js.footballclubmng.model.dto.OrderDto;
import js.footballclubmng.model.request.order.CreateOrderRequest;
import js.footballclubmng.model.response.ResponseAPI;
import js.footballclubmng.repository.OrderRepository;
import js.footballclubmng.service.OrderDetailService;
import js.footballclubmng.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class OrderController {

    @Autowired
    OrderService orderService;

    @Autowired
    OrderDetailService orderDetailService;
    @GetMapping(CommonConstant.ORDER_API.LIST_ORDER)
    @PreAuthorize("hasRole('ROLE_Sale')")
    public ResponseAPI<List<OrderDto>> listOrder() {
        List<OrderDto> list = orderService.getAllOrder();
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, null, list);
    }

    @GetMapping(CommonConstant.ORDER_API.VIEW_ORDER_DETAILS)
    public ResponseAPI<List<OrderDetailDto>> viewOrderDetails(@PathVariable Long orderId) {
        List<OrderDetailDto> orderDetailDtoList = orderDetailService.getOrderDetailsByOrderId(orderId);
        if (orderDetailDtoList.isEmpty()) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.NOT_FOUND, CommonConstant.COMMON_MESSAGE.ORDER_DETAILS_NOT_FOUND);
        }
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, null, orderDetailDtoList);
    }


    @PostMapping(CommonConstant.ORDER_API.CREATE_ORDER)
    public ResponseAPI<Long> createOrder(@RequestBody CreateOrderRequest createOrderRequest, @RequestHeader(name = "Authorization") String token) {
        Order order = orderService.createOrder(createOrderRequest, token);
        Long orderId = order.getId();
        if(order == null) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.CREATE_ORDER_FAIL);
        }
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, CommonConstant.COMMON_MESSAGE.CREATE_ORDER_SUCCESS, orderId);

    }

    @GetMapping(CommonConstant.ORDER_API.LIST_ORDER_BY_USER)
    public ResponseAPI<List<OrderDto>> listOrderByUser(@PathVariable Long userId) {
        List<OrderDto> list = orderService.getOrderByUserId(userId);
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, null, list);
    }




}
