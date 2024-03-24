package js.footballclubmng.service;

import js.footballclubmng.model.response.ListOrderResponse;

import java.util.List;


public interface OrderService {
    List<ListOrderResponse> getAllOrder();
}
