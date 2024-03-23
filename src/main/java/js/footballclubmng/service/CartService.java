package js.footballclubmng.service;

public interface CartService {
    public boolean  addCartItemToCart(String token, long productId);
    public boolean checkQuantity(long productId);
    public boolean removeCartItemFromCart(long cartItemId);
}
