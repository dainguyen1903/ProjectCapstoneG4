package js.footballclubmng.service;

import js.footballclubmng.model.dto.PlayerDto;
import js.footballclubmng.entity.Player;

import java.util.List;
import java.util.Optional;

public interface PlayerService {
    public Optional<Player> getPlayerById(long id);
    public List<PlayerDto> getAllPlayer();
    public boolean createPlayer(Player player);
    public boolean updatePlayer(long id);
    public boolean deletePlayer(long id);
}
