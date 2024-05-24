package js.footballclubmng.service.Impl;

import js.footballclubmng.model.dto.PlayerDto;
import js.footballclubmng.model.response.ListPlayerResponse;
import js.footballclubmng.entity.Player;
import js.footballclubmng.repository.PlayerRepository;
import js.footballclubmng.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.Date;
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
    public boolean createPlayer(PlayerDto player) {
        try {
            Player p = new Player();
            p.setPlayerNumber(Long.valueOf(player.getPlayerNumber()));
            p.setName(player.getName());
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            Date date = sdf.parse(player.getDateOfBirth());
            p.setDateOfBirth(date);
            p.setHeight(Integer.valueOf(player.getHeight()));
            p.setWeight(Integer.valueOf(player.getWeight()));
            p.setImageAvatar(player.getImageAvatar());
            p.setImageFirstJersey(player.getImageFirstJersey());
            p.setImageSecondJersey(player.getImageSecondJersey());
            p.setNationality(player.getNationality());
            p.setPosition(player.getPosition());
            p.setBio(player.getBio());
            Date joinDate = sdf.parse(player.getJoinDate());
            p.setJoinDate(joinDate);
            p.setStatus(true);
            playerRepository.save(p);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean updatePlayer(long id, PlayerDto player) {
        try {
            Player p = playerRepository.findById(id).orElse(null);
            if (p != null) {
                p.setPlayerNumber(Long.valueOf(player.getPlayerNumber()));
                p.setName(player.getName());
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                Date date = sdf.parse(player.getDateOfBirth());
                p.setDateOfBirth(date);
                p.setHeight(Integer.valueOf(player.getHeight()));
                p.setWeight(Integer.valueOf(player.getWeight()));
                p.setImageAvatar(player.getImageAvatar());
                p.setImageFirstJersey(player.getImageFirstJersey());
                p.setImageSecondJersey(player.getImageSecondJersey());
                p.setNationality(player.getNationality());
                p.setPosition(player.getPosition());
                p.setBio(player.getBio());
                Date joinDate = sdf.parse(player.getJoinDate());
                p.setJoinDate(joinDate);
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

    @Override
    public boolean checkPlayerNumberExist(Long number) {
        Player player = playerRepository.checkNumberPlayer(number);
        if (player == null) {
            return true;
        }
        return false;
    }


    private ListPlayerResponse mapToPlayerDto(Player player) {
        ListPlayerResponse listPlayerResponse = new ListPlayerResponse();
        listPlayerResponse.setPlayerNumber(player.getPlayerNumber());
        listPlayerResponse.setName(player.getName());
        listPlayerResponse.setNationality(player.getNationality());
        listPlayerResponse.setPosition(player.getPosition());
        return listPlayerResponse;
    }

    public static Date getPreviousDate(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date); // Đặt ngày muốn xem
        calendar.add(Calendar.DAY_OF_MONTH, -1); // Trừ một ngày
        return calendar.getTime(); // Trả về ngày trước đó
    }
    public boolean isDateInThePast(String date) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        try {
            Date d = sdf.parse(date);
            Date currentDate = new Date();
            Date previousDate = getPreviousDate(currentDate);
            if (d.before(previousDate)) {
                return true;
            }
            return false;
        } catch (Exception e) {
            return false;
        }
    }

}
