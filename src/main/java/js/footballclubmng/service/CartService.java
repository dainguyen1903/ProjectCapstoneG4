package js.footballclubmng.service;

import js.footballclubmng.entity.Cart;
import js.footballclubmng.entity.CartItem;
import js.footballclubmng.model.request.CustomiseProductRequest;

public interface CartService {
    public boolean  addCartItemToCart(String token, long productId, String size);
    public boolean checkQuantity(long productId);
    public boolean removeCartItemFromCart(long cartItemId);
    public Cart ViewCart(String token);
    public boolean updateQuantityCartItem(long cartItemId, int quantity);
    public CartItem getCartItemById(long cartItemId);
    public boolean customiseAddCartItemToCart(String token, long productId, CustomiseProductRequest customiseProductRequest);

    public void deleteCartByToken(String token);
}
