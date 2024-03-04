package js.footballclubmng.repository;

import js.footballclubmng.entity.Player;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayerRepository extends JpaRepository<Player,Long> {
    Player findByPosition(String position);

}
