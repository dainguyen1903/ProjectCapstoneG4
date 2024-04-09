package js.footballclubmng.service.Impl;

import js.footballclubmng.common.MapperUtil;
import js.footballclubmng.config.TokenProvider;
import js.footballclubmng.entity.*;
import js.footballclubmng.model.response.ListCartTicketItemResponse;
import js.footballclubmng.repository.CartTicketItemRepository;
import js.footballclubmng.repository.CartTicketRepository;
import js.footballclubmng.repository.FixturesRepository;
import js.footballclubmng.repository.UserRepository;
import js.footballclubmng.service.CartTicketService;
import js.footballclubmng.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CartTicketServiceImpl implements CartTicketService {
    @Autowired
    private CartTicketRepository cartTicketRepository;
    @Autowired
    private CartTicketItemRepository cartTicketItemRepository;
    @Autowired
    private TokenProvider tokenProvider;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private FixturesRepository fixturesRepository;

    @Override
    public boolean addCartTicketItemToCartTicket(String token, int quantity, long fixtureId) {
        try {
            String jwtToken = token.substring(7);
            String email = tokenProvider.getUsernameFromJWT(jwtToken);
            User user = userRepository.findByEmail(email);
            Fixtures fixtures = fixturesRepository.findById(fixtureId).orElse(null);

            CartTicket cartTicket = cartTicketRepository.findByUser(user);
            if (cartTicket == null) {
                CartTicket cartTicket1 = new CartTicket();
                cartTicket1.setUser(user);
                cartTicketRepository.save(cartTicket1);
                CartTicketItem cartTicketItem = new CartTicketItem();
                cartTicketItem.setFixtures(fixtures);
                cartTicketItem.setQuantity(1);
                cartTicketItem.setCartTicket(cartTicket1);
                cartTicketItemRepository.save(cartTicketItem);
                return true;
            }
            CartTicketItem cartTicketItem = cartTicketItemRepository.findByCartTicketAndFixtures(cartTicket, fixtures);
            if (cartTicketItem == null) {
                CartTicketItem cartTicketItem1 = new CartTicketItem();
                cartTicketItem1.setFixtures(fixtures);
                cartTicketItem1.setQuantity(1);
                cartTicketItem1.setCartTicket(cartTicket);
                cartTicketItemRepository.save(cartTicketItem1);
                return true;
            }
            cartTicketItem.setQuantity(cartTicketItem.getQuantity() + 1);
            cartTicketItemRepository.save(cartTicketItem);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public List<ListCartTicketItemResponse> viewCartTicket(String token) {
        String jwtToken = token.substring(7);
        String email = tokenProvider.getUsernameFromJWT(jwtToken);
        User user = userRepository.findByEmail(email);
        CartTicket cartTicket = cartTicketRepository.findByUser(user);
        List<CartTicketItem> list = cartTicketItemRepository.findAllByCartTicket(cartTicket);
        return list.stream()
                .map(MapperUtil::mapToListCartTicketItemsResponses)
                .collect(Collectors.toList());
    }

    @Override
    public CartTicketItem getCartTicketItemById(long cartTicketItemId) {
        return cartTicketItemRepository.findById(cartTicketItemId).orElse(null);
    }

    @Override
    public boolean removeCartTicketItemFromCartTicket(long cartTicketItemId) {
        try {
            cartTicketItemRepository.deleteById(cartTicketItemId);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean updateQuantityCartTicketItem(long cartTicketItemId, int quantity) {
        try {
            CartTicketItem cartTicketItem = cartTicketItemRepository.findById(cartTicketItemId).orElse(null);
            if (cartTicketItem != null) {
                cartTicketItem.setQuantity(quantity);
                cartTicketItemRepository.save(cartTicketItem);
                return true;
            }
            return false;
        } catch (Exception e) {
            return false;
        }
    }


}
