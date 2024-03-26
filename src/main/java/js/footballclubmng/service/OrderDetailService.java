package js.footballclubmng.service;

import js.footballclubmng.entity.Order;
import js.footballclubmng.entity.OrderDetail;

import java.util.List;

public interface OrderDetailService {

    public Order getOrderById(Long orderId);
}
