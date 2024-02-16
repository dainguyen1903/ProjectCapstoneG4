package js.footballclubmng.service;

import js.footballclubmng.entity.Player;

import java.util.List;
import java.util.Optional;

public interface PlayerService {
    public Optional<Player> getPlayerById(int id);
    public List<Player> getAllPlayer();
}
