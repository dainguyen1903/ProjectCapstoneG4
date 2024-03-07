package js.footballclubmng.repository;

import js.footballclubmng.entity.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlayerRepository extends JpaRepository<Player,Long> {
    @Query(value = "select * from player p where " +
            "lower(p.name) like lower(concat('%', :query, '%')) or " +
            "lower(p.nationality) like lower(concat('%', :query, '%')) or " +
//            "p.date_of_birth = :query OR " +
            "p.height = :query or " +
            "p.weight = :query or " +
            "p.number_player = :query or " +
            "lower(p.position) like lower(concat('%', :query, '%'))", nativeQuery = true)
    List<Player> searchPlayer(String query);

}
