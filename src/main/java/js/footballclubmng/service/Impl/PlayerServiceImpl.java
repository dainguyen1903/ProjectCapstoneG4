package js.footballclubmng.service.Impl;

import js.footballclubmng.entity.Player;
import js.footballclubmng.repository.PlayerRepository;
import js.footballclubmng.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlayerServiceImpl implements PlayerService {
    @Autowired
    private PlayerRepository playerRepository;
    @Override
    public Optional<Player> getPlayerById(int id){
        Optional<Player> p = playerRepository.findById(id);
        return p;
    }
    @Override
    public List<Player> getAllPlayer(){
        List<Player> playerList = playerRepository.findAll();
        return playerList;
    }
}
