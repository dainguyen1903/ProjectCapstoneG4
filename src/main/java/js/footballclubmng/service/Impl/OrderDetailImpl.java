package js.footballclubmng.service.Impl;

import js.footballclubmng.entity.Order;
import js.footballclubmng.entity.OrderDetail;
import js.footballclubmng.repository.OrderRepository;
import js.footballclubmng.service.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderDetailImpl implements OrderDetailService {
    @Autowired
    OrderRepository orderRepository;
    @Override
    public Order getOrderById(Long orderId) {
        Order order = orderRepository.findById(orderId).orElse(null);
        return order;
    }
}
