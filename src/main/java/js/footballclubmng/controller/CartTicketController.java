package js.footballclubmng.controller;

import js.footballclubmng.common.CommonConstant;
import js.footballclubmng.entity.CartTicketItem;
import js.footballclubmng.entity.Fixtures;
import js.footballclubmng.model.dto.FixturesDto;
import js.footballclubmng.model.response.ListCartTicketItemResponse;
import js.footballclubmng.model.response.ResponseAPI;
import js.footballclubmng.service.CartTicketService;
import js.footballclubmng.service.FixturesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CartTicketController {
    @Autowired
    private CartTicketService cartTicketService;
    @Autowired
    private FixturesService fixturesService;

    @PostMapping(CommonConstant.CART_TICKET_API.ADD_CART_TICKET_ITEM)
    public ResponseAPI<Object> addCartTicketItemToCartTicket(@RequestHeader(name = "Authorization",required = false) String token, @RequestParam int quantity, @PathVariable long fixtureId) {
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
        if (Integer.parseInt(fixtures.getNumberOfTicket()) < quantity){
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.NOT_ENOUGH_TICKET);
        }
        boolean checkQuantity = cartTicketService.checkQuantityCartTicketItems(token, fixtureId, quantity);
        if (!checkQuantity){
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.QUANTITY_LIMIT_CART_TICKET_ITEM);
        }
        boolean result = cartTicketService.addCartTicketItemToCartTicket(token, quantity, fixtureId);
        if (result) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, CommonConstant.COMMON_MESSAGE.ADD_CART_TICKET_ITEM_SUCCESS);
        }
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.ADD_CART_TICKET_ITEM_FAIL);
    }

    @GetMapping(CommonConstant.CART_TICKET_API.VIEW_CART_TICKET)
    public ResponseAPI<Object> viewCartTicket(@RequestHeader(name = "Authorization",required = false) String token) {
        if (token == null) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.EMPTY_TOKEN);
        }
        List<ListCartTicketItemResponse> cartTicketItems = cartTicketService.viewCartTicket(token);
        if (cartTicketItems == null || cartTicketItems.isEmpty()) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.EMPTY, CommonConstant.COMMON_MESSAGE.EMPTY_CART_TICKET);
        }
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, null, cartTicketItems);
    }

    @DeleteMapping(CommonConstant.CART_TICKET_API.REMOVE_CART_TICKET_ITEM)
    public ResponseAPI<Object> removeCartTicketItem(@PathVariable long cartTicketItemId) {
        CartTicketItem cartTicketItem = cartTicketService.getCartTicketItemById(cartTicketItemId);
        if (cartTicketItem == null) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.NOT_FOUND_CART_TICKET_ITEM);
        }
        boolean result = cartTicketService.removeCartTicketItemFromCartTicket(cartTicketItemId);
        if (result) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, CommonConstant.COMMON_MESSAGE.REMOVE_CART_TICKET_ITEM_SUCCESS);
        }
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.REMOVE_CART_TICKET_ITEM_FAIL);
    }

    @PutMapping(CommonConstant.CART_TICKET_API.UPDATE_QUANTITY_CART_TICKET_ITEM)
    public ResponseAPI<Object> updateQuantityCartTicketItem(@PathVariable long cartTicketItemId, @RequestParam int quantity) {
        CartTicketItem cartTicketItem = cartTicketService.getCartTicketItemById(cartTicketItemId);
        if (cartTicketItem == null) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.NOT_FOUND_CART_TICKET_ITEM);
        }
        if (quantity > 2){
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.QUANTITY_LIMIT);
        }
        boolean result = cartTicketService.updateQuantityCartTicketItem(cartTicketItemId, quantity);
        if (result) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, CommonConstant.COMMON_MESSAGE.UPDATE_QUANTITY_CART_TICKET_ITEM_SUCCESS);
        }
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.UPDATE_QUANTITY_CART_TICKET_ITEM_FAIL);
    }

}
