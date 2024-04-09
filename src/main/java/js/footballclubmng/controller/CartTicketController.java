package js.footballclubmng.controller;

import js.footballclubmng.common.CommonConstant;
import js.footballclubmng.entity.Fixtures;
import js.footballclubmng.model.dto.FixturesDto;
import js.footballclubmng.model.response.ResponseAPI;
import js.footballclubmng.service.CartTicketService;
import js.footballclubmng.service.FixturesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class CartTicketController {
    @Autowired
    private CartTicketService cartTicketService;
    @Autowired
    private FixturesService fixturesService;

    @PostMapping(CommonConstant.CART_TICKET_API.ADD_CART_TICKET_ITEM)
    public ResponseAPI<Object> addCartTicketItemToCartTicket(@RequestHeader(name = "Authorization") String token, @RequestParam int quantity, @PathVariable long fixtureId) {
        if (token == null) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.EMPTY_TOKEN);
        }
        FixturesDto fixtures = fixturesService.getFixturesById(fixtureId);
        if (fixtures == null) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.NOT_FOUND_FIXTURES);
        }
        if (quantity > 2){
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.QUANTITY_LIMIT);
        }
        if (fixtures.getNumberOfTicket() < quantity){
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.NOT_ENOUGH_TICKET);
        }
        boolean result = cartTicketService.addCartTicketItemToCartTicket(token, quantity, fixtureId);
        if (result) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, CommonConstant.COMMON_MESSAGE.ADD_CART_TICKET_ITEM_SUCCESS);
        }
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.ADD_CART_TICKET_ITEM_FAIL);
    }
}
