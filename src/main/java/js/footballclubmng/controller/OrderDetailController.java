package js.footballclubmng.controller;

import js.footballclubmng.common.CommonConstant;
import js.footballclubmng.entity.OrderDetail;
import js.footballclubmng.model.response.ListOrderDetailsResponse;
import js.footballclubmng.model.response.ListOrderResponse;
import js.footballclubmng.model.response.ResponseAPI;
import js.footballclubmng.service.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class OrderDetailController {
    @Autowired
    OrderDetailService orderDetailService;

    @GetMapping(CommonConstant.ORDER_API.VIEW_ORDER_DETAILS)
    @PreAuthorize("hasRole('ROLE_Sale')")
    public ResponseAPI<List<ListOrderDetailsResponse>> getOrderDetailsByOrderId(@PathVariable Long id) {
        List<ListOrderDetailsResponse> orderDetailList = orderDetailService.viewOrderDetails(id);
        // --> ListOrderResponse
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, null, orderDetailList);
    }



}
