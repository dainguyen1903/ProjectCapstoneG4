package js.footballclubmng.service;

import js.footballclubmng.entity.Cart;
import js.footballclubmng.entity.CartItem;
import js.footballclubmng.model.request.CustomiseProductRequest;
import js.footballclubmng.model.response.ListCartItemsResponse;

import java.util.List;

public interface CartService {
    public boolean  addCartItemToCart(String token, long productId, String size, int quantity);
    public boolean customiseAddCartItemToCart(String token, long productId, CustomiseProductRequest customiseProductRequest);
    public boolean removeCartItemFromCart(long cartItemId);
    public List<ListCartItemsResponse> ViewCart(String token);
    public boolean updateQuantityCartItem(long cartItemId, int quantity);
    public CartItem getCartItemById(long cartItemId);

    public boolean checkQuantity(Long productId,String size);
    public boolean checkQuantityInStock(Long productId, String size, int quantity);
    public boolean checkQuantityCartItems(String token, Long productId, String size, int quantity);

    public void deleteCartByToken(String token);

}
