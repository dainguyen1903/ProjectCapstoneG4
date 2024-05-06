package js.footballclubmng.service;

import js.footballclubmng.model.response.ListPlayerResponse;
import js.footballclubmng.entity.Player;

import java.util.List;

public interface PlayerService {
    public Player getPlayerById(long id);
    public List<ListPlayerResponse> getAllPlayer();
    public boolean createPlayer(Player player);
    public boolean updatePlayer(long id, Player player);
    public boolean deletePlayer(long id);
    public List<Player> searchPlayer(String search);
    public boolean checkPlayerNumberExist(Integer number);
}
