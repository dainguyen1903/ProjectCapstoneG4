package js.footballclubmng.service;

import js.footballclubmng.model.dto.PlayerDto;
import js.footballclubmng.model.response.ListPlayerResponse;
import js.footballclubmng.entity.Player;

import java.util.List;

public interface PlayerService {
    public Player getPlayerById(long id);
    public List<ListPlayerResponse> getAllPlayer();
    public boolean createPlayer(PlayerDto player);
    public boolean updatePlayer(long id, PlayerDto player);
    public boolean deletePlayer(long id);
    public List<Player> searchPlayer(String search);
    public boolean checkPlayerNumberExist(Long number);
}
