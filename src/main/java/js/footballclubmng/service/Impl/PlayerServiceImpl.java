package js.footballclubmng.service.Impl;

import js.footballclubmng.model.response.ListPlayerResponse;
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
    public Player getPlayerById(long id) {
        try {
            Player p = playerRepository.findById(id).orElse(null);
            return p;
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public List<ListPlayerResponse> getAllPlayer(){
        List<Player> playerList = playerRepository.viewAllPlayer();
        return playerList.stream().map((player) -> mapToPlayerDto(player)).collect(Collectors.toList());
    }
    @Override
    public boolean createPlayer(Player player) {
        try {
            Player p = new Player();
            p.setName(player.getName());
            p.setDateOfBirth(player.getDateOfBirth());
            p.setHeight(player.getHeight());
            p.setWeight(player.getWeight());
            p.setNationality(player.getNationality());
            p.setImageUrl(player.getImageUrl());
            p.setPosition(player.getPosition());
            p.setBio(player.getBio());
            p.setJoinDate(player.getJoinDate());
            p.setNumberPlayer(player.getNumberPlayer());
            p.setStatus(true);
            playerRepository.save(p);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean updatePlayer(long id, Player player) {
        try {
            Player p = playerRepository.findById(id).orElse(null);
            if (p != null) {
                p.setName(player.getName());
                p.setDateOfBirth(player.getDateOfBirth());
                p.setHeight(player.getHeight());
                p.setWeight(player.getWeight());
                p.setNationality(player.getNationality());
                p.setImageUrl(player.getImageUrl());
                p.setPosition(player.getPosition());
                p.setBio(player.getBio());
                p.setJoinDate(player.getJoinDate());
                p.setNumberPlayer(player.getNumberPlayer());
                playerRepository.save(p);
                return true;
            }
            return false;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean deletePlayer(long id) {
        try {
            Player p = playerRepository.findById(id).orElse(null);
            p.setStatus(false);
            playerRepository.save(p);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public List<Player> searchPlayer(String search) {
        return playerRepository.searchPlayer(search);
    }


    private ListPlayerResponse mapToPlayerDto(Player player) {
        ListPlayerResponse listPlayerResponse = new ListPlayerResponse();
        listPlayerResponse.setId(player.getId());
        listPlayerResponse.setName(player.getName());
        listPlayerResponse.setNationality(player.getNationality());
        listPlayerResponse.setPosition(player.getPosition());
        return listPlayerResponse;
    }


}
