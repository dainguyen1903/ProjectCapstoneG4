package js.footballclubmng.service;

import js.footballclubmng.entity.CartTicketItem;
import js.footballclubmng.entity.Fixtures;
import js.footballclubmng.model.response.ListCartTicketItemResponse;

import java.util.List;

public interface CartTicketService {
    public boolean addCartTicketItemToCartTicket(String token, int quantity, long fixtureId);
    public boolean removeCartTicketItemFromCartTicket(long cartTicketItemId);
    public boolean updateQuantityCartTicketItem(long cartTicketItemId, int quantity);
    public List<ListCartTicketItemResponse> viewCartTicket(String token);
}
