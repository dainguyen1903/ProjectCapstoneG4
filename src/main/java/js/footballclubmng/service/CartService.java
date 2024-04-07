package js.footballclubmng.service;

import js.footballclubmng.entity.Cart;
import js.footballclubmng.entity.CartItem;
import js.footballclubmng.model.request.CustomiseProductRequest;
import js.footballclubmng.model.response.ListCartItemsResponse;

import java.util.List;

public interface CartService {
    public boolean  addCartItemToCart(String token, long productId, String size);
    public boolean checkQuantity(Long productId,String size);
    public boolean removeCartItemFromCart(long cartItemId);
    public List<ListCartItemsResponse> ViewCart(String token);
    public boolean updateQuantityCartItem(long cartItemId, int quantity);
    public CartItem getCartItemById(long cartItemId);
    public boolean customiseAddCartItemToCart(String token, long productId, CustomiseProductRequest customiseProductRequest);
}
