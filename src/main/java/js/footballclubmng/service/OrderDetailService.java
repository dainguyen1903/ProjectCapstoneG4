package js.footballclubmng.service;

import js.footballclubmng.entity.Order;
import js.footballclubmng.entity.OrderDetail;
import js.footballclubmng.model.dto.OrderDetailDto;
import js.footballclubmng.model.response.OrderDetailResponse;

import java.util.List;

public interface OrderDetailService {

    public List<OrderDetailResponse> getOrderDetailsByOrderId(Long orderId);
}
