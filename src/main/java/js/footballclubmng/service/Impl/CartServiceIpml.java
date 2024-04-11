package js.footballclubmng.service.Impl;

import js.footballclubmng.config.TokenProvider;
import js.footballclubmng.entity.Cart;
import js.footballclubmng.entity.CartItem;
import js.footballclubmng.entity.Product;
import js.footballclubmng.entity.User;
import js.footballclubmng.model.request.CustomiseProductRequest;
import js.footballclubmng.repository.CartItemRepository;
import js.footballclubmng.repository.CartRepository;
import js.footballclubmng.repository.ProductRepository;
import js.footballclubmng.repository.UserRepository;
import js.footballclubmng.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
    public boolean addCartItemToCart(String token, long productId, String size) {
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
                cartItem.setSize(size);
                cartItemRepository.save(cartItem);
            }
            CartItem cartItem = cartItemRepository.findByProductAndCartAndSize(product, cart, size);
            if (cartItem == null) {
                CartItem cartItem1 = new CartItem();
                cartItem1.setProduct(product);
                cartItem1.setQuantity(1);
                cartItem1.setCart(cart);
                cartItem1.setSize(size);
                cartItemRepository.save(cartItem1);
            }
            if (cartItem != null && cartItem.getSize().equals(size)) {
            cartItem.setQuantity(cartItem.getQuantity() + 1);
            cartItemRepository.save(cartItem);
            }
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean checkQuantity(long productId) {
//        Product product = productRepository.findById(productId).orElse(null);
//        if (product != null) {
//            if (product.getQuantity() >= 1) {
//                return true;
//            }
//        }
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

    @Override
    public boolean updateQuantityCartItem(long cartItemId, int quantity) {
        try {
            CartItem cartItem = cartItemRepository.findById(cartItemId).orElse(null);
            if (cartItem != null) {
                cartItem.setQuantity(quantity);
                cartItemRepository.save(cartItem);
                return true;
            }
            return false;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public CartItem getCartItemById(long cartItemId) {
        return cartItemRepository.findById(cartItemId).orElse(null);
    }

    @Override
    public boolean customiseAddCartItemToCart(String token, long productId, CustomiseProductRequest customiseProductRequest) {
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
                cartItem.setSize(customiseProductRequest.getSize());
                cartItem.setPlayerName(customiseProductRequest.getPlayerName());
                cartItem.setPlayerNumber(customiseProductRequest.getPlayerNumber());
                cartItemRepository.save(cartItem);
            }
            CartItem cartItem = cartItemRepository.findByProductAndCartAndSizeAndPlayerNumberAndPlayerName(product, cart, customiseProductRequest.getSize(), customiseProductRequest.getPlayerNumber(), customiseProductRequest.getPlayerName());
            if (cartItem == null) {
                CartItem cartItem1 = new CartItem();
                cartItem1.setProduct(product);
                cartItem1.setQuantity(1);
                cartItem1.setCart(cart);
                cartItem1.setSize(customiseProductRequest.getSize());
                cartItem1.setPlayerName(customiseProductRequest.getPlayerName());
                cartItem1.setPlayerNumber(customiseProductRequest.getPlayerNumber());
                cartItemRepository.save(cartItem1);
            }
            if (cartItem != null && cartItem.getSize().equals(customiseProductRequest.getSize())) {
                cartItem.setQuantity(cartItem.getQuantity() + 1);
                cartItemRepository.save(cartItem);
            }
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public void deleteCartByToken(String token) {
        // Lấy thông tin người dùng từ token
        String jwtToken = token.substring(7);
        String email = tokenProvider.getUsernameFromJWT(jwtToken);
        User user = userRepository.findByEmail(email);

        // Lấy cart của người dùng từ user
        Cart cart = cartRepository.findByUser(user);

        // Lấy danh sách cart items
        List<CartItem> cartItems = cart.getCartItems();

        // Xóa tất cả các cart items
        cartItemRepository.deleteAll(cartItems);

        // Xóa cart
        cartRepository.delete(cart);
    }


}
