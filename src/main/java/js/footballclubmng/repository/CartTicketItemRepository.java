package js.footballclubmng.repository;

import js.footballclubmng.entity.CartTicket;
import js.footballclubmng.entity.CartTicketItem;
import js.footballclubmng.entity.Fixtures;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartTicketItemRepository extends JpaRepository<CartTicketItem, Long> {
    CartTicketItem findByCartTicketAndFixtures(CartTicket cartTicket, Fixtures fixtures);
}
