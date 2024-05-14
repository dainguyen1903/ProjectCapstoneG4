package js.footballclubmng.service;

import js.footballclubmng.entity.User;
import js.footballclubmng.model.dto.UserDto;
import js.footballclubmng.model.response.ListShippingResponse;

import java.util.List;

public interface ShipService {
    public List<ListShippingResponse> getAllShipping();

    public void assignToShipper(Long shipperId, Long shippingId);

    public List<ListShippingResponse> listShippingByShipper(String token);

    List<UserDto> getShipperByShippingId(Long shippingId);

    public int countOrderByShipper(Long shipperId);
}
