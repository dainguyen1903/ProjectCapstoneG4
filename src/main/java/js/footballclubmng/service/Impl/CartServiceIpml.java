package js.footballclubmng.service.Impl;

import js.footballclubmng.util.MapperUtil;
import js.footballclubmng.config.TokenProvider;
import js.footballclubmng.entity.*;
import js.footballclubmng.model.request.CustomiseProductRequest;
import js.footballclubmng.model.response.ListCartItemsResponse;
import js.footballclubmng.repository.*;
import js.footballclubmng.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.stream.Collectors;


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
    @Autowired
    private ProductSizeRepository productSizeRepository;

    @Override
    public List<ListCartItemsResponse> ViewCart(String token) {
        String jwtToken = token.substring(7);
        String email = tokenProvider.getUsernameFromJWT(jwtToken);
        User user = userRepository.findByEmail(email);
        Cart cart = cartRepository.findByUser(user);
        if(cart==null) {
            return null;
        }
        List<CartItem> cartItemList = cartItemRepository.findAllByCart(cart);
        return cartItemList.stream()
                .map(MapperUtil::mapToListCartItemsResponses)
                .collect(Collectors.toList());
    }

    @Override
    public boolean addCartItemToCart(String token, Long productId, String size, int quantity) {
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
                cartItem.setProductId(productId);
                cartItem.setQuantity(1);
                cartItem.setCartId(cart1.getId());
                cartItem.setSize(size);
                cartItem.setQuantity(quantity);
                cartItemRepository.save(cartItem);
            } else {
                CartItem cartItem = cartItemRepository.findByProductAndCartAndSizeAndPlayerNumber(product, cart, size, null);
                if (cartItem == null) {
                    CartItem cartItem1 = new CartItem();
                    cartItem1.setProductId(productId);
                    cartItem1.setQuantity(1);
                    cartItem1.setCartId(cart.getId());
                    cartItem1.setSize(size);
                    cartItem1.setQuantity(quantity);
                    cartItemRepository.save(cartItem1);
                }else {
                    cartItem.setQuantity(cartItem.getQuantity() + quantity);
                    cartItemRepository.save(cartItem);
                }
            }
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean customiseAddCartItemToCart(String token, Long productId, CustomiseProductRequest customiseProductRequest) {
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
                cartItem.setProductId(productId);
                cartItem.setQuantity(1);
                cartItem.setId(cart1.getId());
                cartItem.setSize(customiseProductRequest.getSize());
                cartItem.setQuantity(customiseProductRequest.getQuantity());
                cartItem.setPlayerNumber(customiseProductRequest.getPlayerNumber());
                cartItemRepository.save(cartItem);
                return true;
            }

            CartItem cartItem = cartItemRepository.findByProductAndCartAndSizeAndPlayerNumber(product, cart, customiseProductRequest.getSize(), customiseProductRequest.getPlayerNumber());
            if (cartItem == null) {
                CartItem cartItem1 = new CartItem();
                cartItem1.setProductId(productId);
                cartItem1.setQuantity(1);
                cartItem1.setCartId(cart.getId());
                cartItem1.setSize(customiseProductRequest.getSize());
                cartItem1.setQuantity(customiseProductRequest.getQuantity());
                cartItem1.setPlayerNumber(customiseProductRequest.getPlayerNumber());
                cartItemRepository.save(cartItem1);
                return true;
            }
            if (cartItem != null && cartItem.getSize().equals(customiseProductRequest.getSize())) {
                cartItem.setQuantity(cartItem.getQuantity() + customiseProductRequest.getQuantity());
                cartItemRepository.save(cartItem);
                return true;
            }
        } catch (Exception e) {
            return false;
        }
        return false;
    }

    @Override
    public boolean removeCartItemFromCart(Long cartItemId) {
        try {
            cartItemRepository.deleteById(cartItemId);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean updateQuantityCartItem(Long cartItemId, int quantity) {
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
    public CartItem getCartItemById(Long cartItemId) {

        return cartItemRepository.findById(cartItemId).orElse(null);
    }

    public boolean checkQuantity(Long productId, String size) {
        ProductSize productSize = productSizeRepository.findProductSizeByProductIdAndSize(productId, size);
        if (productSize != null) {
            if (productSize.getQuantity() >= 1) {
                return true;
            }
        }
        return false;
    }

    public boolean checkQuantityInStock(Long productId, String size, int quantity) {
        ProductSize productSize = productSizeRepository.findProductSizeByProductIdAndSize(productId, size);
        if (productSize != null) {
            if (productSize.getQuantity() >= quantity) {
                return true;
            }
        }
        return false;
    }

    @Override
    public boolean checkQuantityCartItems(String token, Long productId, String size, int quantity) {
        try {
            String jwtToken = token.substring(7);
            String email = tokenProvider.getUsernameFromJWT(jwtToken);
            User user = userRepository.findByEmail(email);
            Product product = productRepository.findById(productId).orElse(null);
            Cart cart = cartRepository.findByUser(user);
            if(cart == null){
                return true;
            }
            List<CartItem> cartItemList = cartItemRepository.findAllByCartAndSizeAndProduct(cart, size, product);
            if (cartItemList.isEmpty() && cartItemList != null){
                return true;
            }
            if (cartItemList != null && !cartItemList.isEmpty()) {
                int totalQuantity = 0;
                for (CartItem cartItem : cartItemList) {
                    totalQuantity += cartItem.getQuantity();
                }
                ProductSize productSize = productSizeRepository.findProductSizeByProductIdAndSize(productId, size);
                if (totalQuantity + quantity <= productSize.getQuantity()) {
                    return true;
                }
            }
        } catch (Exception e) {
            return false;
        }
        return false;
    }

    @Override
    public void deleteCartByToken(String token) {
        // Lấy thông tin người dùng từ token
        String jwtToken = token.substring(7);
        String email = tokenProvider.getUsernameFromJWT(jwtToken);
        User user = userRepository.findByEmail(email);

        // Lấy cart của người dùng từ user
        Cart cart = cartRepository.findByUser(user);

        // Xóa cart
        cartRepository.delete(cart);

    }


}
