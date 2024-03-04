package js.footballclubmng.service;

import js.footballclubmng.model.response.ListPlayerResponse;
import js.footballclubmng.entity.Player;

import java.util.List;
import java.util.Optional;

public interface PlayerService {
    public Player getPlayerById(long id);
    public List<ListPlayerResponse> getAllPlayer();
    public boolean createPlayer(Player player);
    public boolean updatePlayer(long id, Player player);
    public boolean deletePlayer(long id);
}
