package js.footballclubmng.service;

import js.footballclubmng.model.response.ListShippingResponse;

import java.util.List;

public interface ShipService {
    public List<ListShippingResponse> getAllShipping();

    public void assignToShipper(Long shipperId, Long shippingId);

    public List<ListShippingResponse> listShippingByShipper(Long shipperId);

    public void updateShippingStatus(Long shippingId, String updateStatus);

    public List<String> getShippingStatusOptions();
}
