package js.footballclubmng.service;

import js.footballclubmng.entity.Cart;
import js.footballclubmng.entity.CartItem;

import java.util.List;

public interface CartService {
    public boolean  addCartItemToCart(String token, long productId);
    public boolean checkQuantity(long productId);
    public boolean removeCartItemFromCart(long cartItemId);
    public Cart ViewCart(String token);
}
