package js.footballclubmng.controller;

import js.footballclubmng.common.CommonConstant;
import js.footballclubmng.entity.User;
import js.footballclubmng.model.dto.OrderDto;
import js.footballclubmng.model.dto.UserDto;
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

    @GetMapping(CommonConstant.SHIPPING_API.LIST_SHIP)
    @PreAuthorize("hasRole('ROLE_Sale')")
    public ResponseAPI<List<ListShippingResponse>> listShipping() {
        List<ListShippingResponse> listShippingResponses = shipService.getAllShipping();
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, null, listShippingResponses);
    }


    @GetMapping(CommonConstant.SHIPPING_API.LIST_SHIP_BY_SHIPPER)
    public ResponseAPI<List<ListShippingResponse>> listShippingByShipper(@RequestHeader(name = "Authorization") String token) {
        List<ListShippingResponse> listShippingResponses = shipService.listShippingByShipper(token);
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, null, listShippingResponses);
    }

    @GetMapping(CommonConstant.SHIPPING_API.LIST_SHIPPER_BY_DISTRICT)
    public ResponseAPI<List<UserDto>> getShipperByShippingId(@PathVariable Long shippingId) {
        List<UserDto> listShipperByShipping = shipService.getShipperByShippingId(shippingId);
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, null, listShipperByShipping);
    }

    @PostMapping(CommonConstant.SHIPPING_API.ASSIGN_SHIPPER)
    @PreAuthorize("hasRole('ROLE_Sale')")
    public ResponseAPI<Void> assignShipper(@PathVariable Long shippingId, @PathVariable Long shipperId) {
        int orderCount = shipService.countOrderByShipper(shipperId);
        if(orderCount > 10) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.ASSIGN_TO_SHIPPER_FAIL);
        }
        shipService.assignToShipper(shippingId, shipperId);
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, CommonConstant.COMMON_MESSAGE.ASSIGN_TO_SHIPPER);
    }

}
