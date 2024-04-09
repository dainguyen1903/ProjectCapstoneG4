package js.footballclubmng.service;

import js.footballclubmng.entity.Fixtures;

public interface CartTicketService {
    public boolean addCartTicketItemToCartTicket(String token, int quantity, long fixtureId);
    public boolean removeCartTicketItemFromCartTicket(long cartTicketItemId);
}
