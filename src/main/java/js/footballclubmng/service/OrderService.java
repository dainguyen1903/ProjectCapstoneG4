package js.footballclubmng.service;

import js.footballclubmng.entity.Order;
import js.footballclubmng.enums.EOrderStatus;
import js.footballclubmng.model.dto.OrderDto;
import js.footballclubmng.model.dto.OrderHistoryDto;
import js.footballclubmng.model.dto.ShippingDto;
import js.footballclubmng.model.request.order.CreateOrderRequest;
import js.footballclubmng.model.response.OrderDetailResponse;
import js.footballclubmng.model.response.QuantityProductSalesResponse;

import java.util.List;

public interface OrderService {
    public List<OrderDto> getAllOrder();

    public Order createOrder(CreateOrderRequest createOrderRequest, String token);

    public List<OrderHistoryDto> getHistoryOrder(String token);

    public OrderDetailResponse getOrderDetail(Long orderId);

    public void cancelOrder(Long orderId);

    public void confirmOrder(Long orderId);

    public void updateStatusOrderByShipepr(Long orderId, EOrderStatus status);

    public List<OrderDto> listOrderByShipper(String token);



}
