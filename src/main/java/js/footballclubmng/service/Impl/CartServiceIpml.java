package js.footballclubmng.service.Impl;

import js.footballclubmng.config.TokenProvider;
import js.footballclubmng.entity.Cart;
import js.footballclubmng.entity.CartItem;
import js.footballclubmng.entity.Product;
import js.footballclubmng.entity.User;
import js.footballclubmng.repository.CartItemRepository;
import js.footballclubmng.repository.CartRepository;
import js.footballclubmng.repository.ProductRepository;
import js.footballclubmng.repository.UserRepository;
import js.footballclubmng.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartServiceIpml implements CartService {
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private CartItemRepository cartItemRepository;
    @Autowired
    private TokenProvider tokenProvider;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProductRepository productRepository;

    @Override
    public boolean addCartItemToCart(String token, long productId) {
        try {
            String jwtToken = token.substring(7);
            String email = tokenProvider.getUsernameFromJWT(jwtToken);
            User user = userRepository.findByEmail(email);

            Product product = productRepository.findById(productId).orElse(null);

            Cart cart = cartRepository.findByUser(user);
            if (cart == null) {
                Cart cart1 = new Cart();
                cart1.setUser(user);
                cartRepository.save(cart1);
                CartItem cartItem = new CartItem();
                cartItem.setProduct(product);
                cartItem.setQuantity(1);
                cartItem.setCart(cart1);
                cartItemRepository.save(cartItem);
            }
            CartItem cartItem = cartItemRepository.findByProductAndAndCart(product, cart);
            if (cartItem == null) {
                CartItem cartItem1 = new CartItem();
                cartItem1.setProduct(product);
                cartItem1.setQuantity(1);
                cartItem1.setCart(cart);
                cartItemRepository.save(cartItem1);
            } else {
                cartItem.setQuantity(cartItem.getQuantity() + 1);
                cartItemRepository.save(cartItem);
            }
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean checkQuantity(long productId) {
        Product product = productRepository.findById(productId).orElse(null);
        if (product != null) {
            if (product.getQuantity() >= 1) {
                return true;
            }
        }
        return false;
    }

    @Override
    public boolean removeCartItemFromCart(long cartItemId) {
        try {
            cartItemRepository.deleteById(cartItemId);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public Cart ViewCart(String token) {
        String jwtToken = token.substring(7);
        String email = tokenProvider.getUsernameFromJWT(jwtToken);
        User user = userRepository.findByEmail(email);
        return cartRepository.findByUser(user);
    }
}
