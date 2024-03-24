package js.footballclubmng.service.Impl;

import js.footballclubmng.entity.Order;
import js.footballclubmng.model.response.ListOrderResponse;
import js.footballclubmng.repository.OrderRepository;
import js.footballclubmng.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
<
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    OrderRepository orderRepository;

    @Override
    public List<ListOrderResponse> getAllOrder() {
        List<Order> list;
        list = orderRepository.listAllOrder();
        return list.stream()
                .map(order -> new ListOrderResponse(
                        order.getId(),
                        order.getUser().getEmail(),
                        order.getTotalPrice(),
                        order.getOrderDate()
                ))
                .collect(Collectors.toList());
    };

}



