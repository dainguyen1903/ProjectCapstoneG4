package js.footballclubmng.repository;

import js.footballclubmng.entity.TicketOrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TicketOrderDetailRepository extends JpaRepository<TicketOrderDetail, Long> {
}
