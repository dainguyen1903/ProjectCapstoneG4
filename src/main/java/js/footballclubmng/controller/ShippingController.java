package js.footballclubmng.controller;

import js.footballclubmng.common.CommonConstant;
import js.footballclubmng.model.dto.OrderDto;
import js.footballclubmng.model.response.ListShippingResponse;
import js.footballclubmng.model.response.ResponseAPI;
import js.footballclubmng.service.ShipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ShippingController {
    @Autowired
    ShipService shipService;

    @GetMapping(CommonConstant.SHIP_API.LIST_SHIP)
    public ResponseAPI<List<ListShippingResponse>> listShipping() {
        List<ListShippingResponse> listShippingResponses = shipService.getAllShipping();
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, null, listShippingResponses);
    }


    @GetMapping(CommonConstant.SHIP_API.LIST_SHIP_BY_SHIPPER)
    public ResponseAPI<List<ListShippingResponse>> listShippingByShipper(@PathVariable Long shipperId) {
        List<ListShippingResponse> listShippingResponses = shipService.listShippingByShipper(shipperId);
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, null, listShippingResponses);
    }



}
