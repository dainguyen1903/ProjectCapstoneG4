package js.footballclubmng.controller;

import js.footballclubmng.common.CommonConstant;
import js.footballclubmng.entity.Cart;
import js.footballclubmng.entity.CartItem;
import js.footballclubmng.entity.Product;
import js.footballclubmng.model.request.CustomiseProductRequest;
import js.footballclubmng.model.response.ResponseAPI;
import js.footballclubmng.service.CartService;
import js.footballclubmng.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
public class CartController {
    @Autowired
    private CartService cartService;

    @Autowired
    private ProductService productService;

    @PostMapping(CommonConstant.CART_API.ADD_CART_ITEM)
    public ResponseAPI<Object> addCartItemToCart(@RequestHeader(name = "Authorization", required = false) String token, @PathVariable int productId, @RequestParam String size) {
        if (token == null) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.EMPTY_TOKEN);
        }
        Product product = productService.getProductById(productId);
        if (product == null) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.PRODUCT_NOT_FOUND);
        }
        boolean quantity = cartService.checkQuantity(productId);
        if (!quantity) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.OUT_OF_STOCK);
        }
        if (size == null || size.isEmpty()) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.SIZE_REQUIRED);
        }
        boolean check = cartService.addCartItemToCart(token, productId, size);
        if (!check) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.ADD_CART_ITEM_FAIL);
        }
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, CommonConstant.COMMON_MESSAGE.ADD_CART_ITEM_SUCCESS);
    }

    @DeleteMapping(CommonConstant.CART_API.REMOVE_CART_ITEM)
    public ResponseAPI<Object> removeCartItemFromCart(@PathVariable int cartItemId) {
        CartItem cartItem = cartService.getCartItemById(cartItemId);
        if (cartItem == null) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.CART_ITEM_NOT_FOUND);
        }
        boolean check = cartService.removeCartItemFromCart(cartItemId);
        if (!check) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.REMOVE_CART_ITEM_FAIL);
        }
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, CommonConstant.COMMON_MESSAGE.REMOVE_CART_ITEM_SUCCESS);
    }

    @GetMapping(CommonConstant.CART_API.VIEW_CART)
    public ResponseAPI<Object> viewCart(@RequestHeader(name = "Authorization", required = false) String token) {
        if (token == null) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.EMPTY_TOKEN);
        }
        Cart cart = cartService.ViewCart(token);
        if (cart == null || cart.getCartItems().isEmpty()) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.EMPTY, CommonConstant.COMMON_MESSAGE.EMPTY_CART);
        }
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, null, cart);
    }

    @PutMapping(CommonConstant.CART_API.UPDATE_QUANTITY_CART_ITEM)
    public ResponseAPI<Object> updateQuantityCartItem(@PathVariable int cartItemId, @RequestParam int quantity) {
        CartItem cartItem = cartService.getCartItemById(cartItemId);
        if (cartItem == null) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.CART_ITEM_NOT_FOUND);
        }
        if (quantity < 0) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.QUANTITY_MUST_GREATER_THAN_ZERO);
        }
        if (quantity == 0) {
            boolean check = cartService.removeCartItemFromCart(cartItemId);
            if (!check) {
                return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.REMOVE_CART_ITEM_FAIL);
            }
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, CommonConstant.COMMON_MESSAGE.REMOVE_CART_ITEM_SUCCESS);
        }
        boolean check = cartService.updateQuantityCartItem(cartItemId, quantity);
        if (!check) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.UPDATE_QUANTITY_CART_ITEM_FAIL);
        }
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, CommonConstant.COMMON_MESSAGE.UPDATE_QUANTITY_CART_ITEM_SUCCESS);
    }

    @PostMapping(CommonConstant.CART_API.CUSTOMISE_ADD_CART_ITEM)
    public ResponseAPI<Object> customiseAddCartItemToCart(@RequestHeader(name = "Authorization", required = false) String token, @PathVariable int productId, @RequestBody @Valid CustomiseProductRequest customiseProductRequest) {
        if (token == null) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.EMPTY_TOKEN);
        }
        Product product = productService.getProductById(productId);
        if (product == null) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.PRODUCT_NOT_FOUND);
        }
        boolean quantity = cartService.checkQuantity(productId);
        if (!quantity) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.OUT_OF_STOCK);
        }
        boolean check = cartService.customiseAddCartItemToCart(token, productId, customiseProductRequest);
        if (!check) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.ADD_CART_ITEM_FAIL);
        }
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, CommonConstant.COMMON_MESSAGE.ADD_CART_ITEM_SUCCESS);
    }


}
