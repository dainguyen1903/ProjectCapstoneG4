package js.footballclubmng.repository;

import js.footballclubmng.entity.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlayerRepository extends JpaRepository<Player,Long> {
    Player findByPosition(String position);
    @Query(value = "SELECT * FROM player p WHERE " +
            "LOWER(p.name) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(p.nationality) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
//            "p.date_of_birth = :query OR " +
            "p.height = :query OR " +
            "p.weight = :query OR " +
            "p.number_player = :query OR " +
            "LOWER(p.position) LIKE LOWER(CONCAT('%', :query, '%'))", nativeQuery = true)
    List<Player> searchPlayer(String query);

}
