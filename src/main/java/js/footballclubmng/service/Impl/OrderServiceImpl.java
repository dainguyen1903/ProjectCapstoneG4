package js.footballclubmng.service.Impl;

import js.footballclubmng.entity.Order;
import js.footballclubmng.repository.OrderRepository;
import js.footballclubmng.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    OrderRepository orderRepository;
    @Override
    public List<Order> getAllOrder() {
        List<Order> list = orderRepository.findAll();
        return list;
    }
}
