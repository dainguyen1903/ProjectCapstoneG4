package js.footballclubmng.controller;

import js.footballclubmng.common.CommonConstant;
import js.footballclubmng.entity.Cart;
import js.footballclubmng.model.response.ResponseAPI;
import js.footballclubmng.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
public class CartController {
    @Autowired
    private CartService cartService;

    @PostMapping(CommonConstant.CART_API.ADD_CART_ITEM)
    public ResponseAPI<Object> addCartItemToCart(@RequestHeader(name = "Authorization",required = false) String token,@PathVariable int productId) {
        if (token == null) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.EMPTY_TOKEN);
        }
        boolean quantity = cartService.checkQuantity(productId);
        if (!quantity) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.OUT_OF_STOCK);
        }
        boolean check = cartService.addCartItemToCart(token, productId);
        if (!check) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.ADD_CART_ITEM_FAIL);
        }
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, CommonConstant.COMMON_MESSAGE.ADD_CART_ITEM_SUCCESS);
    }

    @DeleteMapping(CommonConstant.CART_API.REMOVE_CART_ITEM)
    @PreAuthorize("hasRole('ROLE_User')")
    public ResponseAPI<Object> removeCartItemFromCart(@PathVariable int cartItemId) {
        boolean check = cartService.removeCartItemFromCart(cartItemId);
        if (!check) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.REMOVE_CART_ITEM_FAIL);
        }
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, CommonConstant.COMMON_MESSAGE.REMOVE_CART_ITEM_SUCCESS);
    }

    @GetMapping(CommonConstant.CART_API.VIEW_CART)
    public ResponseAPI<Object> viewCart(@RequestHeader(name = "Authorization",required = false) String token) {
        if (token == null) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.EMPTY_TOKEN);
        }
        Cart cart = cartService.ViewCart(token);
        if (cart == null) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.EMPTY, CommonConstant.COMMON_MESSAGE.EMPTY_CART);
        }
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, null, cart);
    }
}
