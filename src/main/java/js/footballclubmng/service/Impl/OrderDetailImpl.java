package js.footballclubmng.service.Impl;

import js.footballclubmng.entity.Order;
import js.footballclubmng.entity.OrderDetail;
import js.footballclubmng.model.response.ListOrderDetailsResponse;
import js.footballclubmng.model.response.ListOrderResponse;
import js.footballclubmng.repository.OrderDetailRepository;
import js.footballclubmng.service.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderDetailImpl implements OrderDetailService {

    @Autowired
    private OrderDetailRepository orderDetailRepository;


    @Override
    public List<ListOrderDetailsResponse> viewOrderDetails(Long orderId) {
        List<OrderDetail> list;
        list = orderDetailRepository.getByOrderId(orderId);
        return list.stream()
                .map(orderDetail -> new ListOrderDetailsResponse(
                        orderDetail.getId(),
                        orderDetail.getProductName(),
                        orderDetail.getProductPrice(),
                        orderDetail.getPlayerNumber(),
                        orderDetail.getPlayerName(),
                        orderDetail.getSize(),
                        orderDetail.getProduct().getId(),
                        orderDetail.getOrderId()
                ))
                .collect(Collectors.toList());
    }
}
