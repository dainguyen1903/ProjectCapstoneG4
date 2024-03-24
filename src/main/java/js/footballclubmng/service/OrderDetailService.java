package js.footballclubmng.service;

import js.footballclubmng.entity.OrderDetail;
import js.footballclubmng.model.response.ListOrderDetailsResponse;

import java.util.List;

public interface OrderDetailService {

    List<ListOrderDetailsResponse> viewOrderDetails(Long orderId);
}
