package js.footballclubmng.service;

import js.footballclubmng.entity.Order;
import js.footballclubmng.model.dto.OrderDto;
import js.footballclubmng.model.dto.OrderHistoryDto;
import js.footballclubmng.model.dto.ShippingDto;
import js.footballclubmng.model.request.order.CreateOrderRequest;

import java.util.List;

public interface OrderService {
    public List<OrderDto> getAllOrder();

    public Order createOrder(CreateOrderRequest createOrderRequest, String token);

    public List<OrderHistoryDto> getHistoryOrder(String token);

}
