package js.footballclubmng.service.Impl;

import js.footballclubmng.util.MapperUtil;
import js.footballclubmng.entity.OrderDetail;
import js.footballclubmng.model.dto.OrderDetailDto;
import js.footballclubmng.repository.OrderDetailRepository;
import js.footballclubmng.repository.OrderRepository;
import js.footballclubmng.service.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderDetailServiceImpl implements OrderDetailService {
    @Autowired
    OrderRepository orderRepository;

    @Autowired
    OrderDetailRepository orderDetailRepository;
    @Override
    public List<OrderDetailDto> getOrderDetailsByOrderId(Long orderId) {
        List<OrderDetail> orderDetailList = orderDetailRepository.findByOrderId(orderId);
        return MapperUtil.mapToOrderDetailDtoList(orderDetailList);
    }
}
