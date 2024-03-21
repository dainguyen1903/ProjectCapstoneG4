package js.footballclubmng.service;

public interface CartService {
    public boolean  addCartItemToCart(String token, long productId);

    boolean checkQuantity(long productId);
}
