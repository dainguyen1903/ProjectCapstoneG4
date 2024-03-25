package js.footballclubmng.controller;

import js.footballclubmng.common.CommonConstant;
import js.footballclubmng.entity.Order;
import js.footballclubmng.entity.Product;
import js.footballclubmng.model.response.ResponseAPI;
import js.footballclubmng.repository.OrderRepository;
import js.footballclubmng.service.OrderDetailService;
import js.footballclubmng.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class OrderController {

    @Autowired
    OrderService orderService;

    @Autowired
    OrderDetailService orderDetailService;
    @GetMapping(CommonConstant.ORDER_API.LIST_ORDER)
    @PreAuthorize("hasRole('ROLE_Sale')")
    public ResponseAPI<List<Order>> listProduct() {
        List<Order> list = orderService.getAllOrder();
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, null, list);
    }

    @GetMapping(CommonConstant.ORDER_API.VIEW_ORDER_DETAILS)
    @PreAuthorize("hasRole('ROLE_Sale')")
    public ResponseAPI<Order> viewOrderDetails(@PathVariable Long id) {
        Order order = orderDetailService.getOrderById(id);
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, null, order);
    }


}
