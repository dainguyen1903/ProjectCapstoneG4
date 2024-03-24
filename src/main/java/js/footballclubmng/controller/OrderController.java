package js.footballclubmng.controller;

import js.footballclubmng.common.CommonConstant;
import js.footballclubmng.entity.Order;
import js.footballclubmng.entity.Product;
import js.footballclubmng.model.response.ListOrderResponse;
import js.footballclubmng.model.response.ListPlayerResponse;
import js.footballclubmng.model.response.ResponseAPI;
import js.footballclubmng.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class OrderController {

    @Autowired
    OrderService orderService;

    @GetMapping(CommonConstant.ORDER_API.LIST_ORDER)
    @PreAuthorize("hasRole('ROLE_Sale')")
    public ResponseAPI<List<ListOrderResponse>> listOrder() {
        List<ListOrderResponse> orderList = orderService.getAllOrder();
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, null, orderList);
    }


}
