package js.footballclubmng.controller;

import js.footballclubmng.common.CommonConstant;
import js.footballclubmng.entity.Order;
import js.footballclubmng.entity.Product;
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
    public ResponseAPI<List<OrderDto>> listProduct() {
        List<OrderDto> list = orderService.getAllOrder();
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, null, list);
    }

    @GetMapping(CommonConstant.ORDER_API.VIEW_ORDER_DETAILS)
    @PreAuthorize("hasRole('ROLE_Sale')")
    public ResponseAPI<Order> viewOrderDetails(@PathVariable Long id) {
        Order order = orderDetailService.getOrderById(id);
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, null, order);
    }

    @PostMapping(CommonConstant.ORDER_API.CREATE_ORDER)
    public ResponseAPI<Order> createOrder(@RequestBody CreateOrderRequest createOrderRequest, @RequestHeader(name = "Authorization") String token) {
        try {
            // Gọi service để tạo đơn hàng
            Order order = orderService.createOrder(createOrderRequest, token);
            // Trả về kết quả thành công và đối tượng đơn hàng đã tạo
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, CommonConstant.COMMON_MESSAGE.CREATE_ORDER_SUCCESS);
        } catch (Exception e) {
            // Trả về thông báo lỗi nếu có bất kỳ ngoại lệ nào xảy ra
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.CREATE_ORDER_FAIL);
        }

    }
}
