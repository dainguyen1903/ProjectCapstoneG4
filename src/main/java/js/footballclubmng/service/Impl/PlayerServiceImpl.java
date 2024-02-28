package js.footballclubmng.service.Impl;

import js.footballclubmng.model.dto.PlayerDto;
import js.footballclubmng.entity.Player;
import js.footballclubmng.repository.PlayerRepository;
import js.footballclubmng.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PlayerServiceImpl implements PlayerService {
    @Autowired
    private PlayerRepository playerRepository;
    @Override
    public Optional<Player> getPlayerById(int id){
        try {
            Optional<Player> p = playerRepository.findById(id);
            return p;
        }catch (Exception e){
            return null;
        }
    }
    @Override
    public List<PlayerDto> getAllPlayer(){
        List<Player> playerList = playerRepository.findAll();
        return playerList.stream().map((player) -> mapToPlayerDto(player)).collect(Collectors.toList());
    }

    @Override
    public boolean createPlayer(Player player) {

        return false;
    }

    @Override
    public boolean updatePlayer(long id) {
        return false;
    }

    @Override
    public boolean deletePlayer(long id) {
        return false;
    }

    private PlayerDto mapToPlayerDto(Player player){
        PlayerDto playerDto = new PlayerDto();
        playerDto.setId(player.getPlayerId());
        playerDto.setName(player.getName());
        playerDto.setNationality(player.getNationality());
        playerDto.setPosition(player.getPosition());
        return playerDto;
    }


}