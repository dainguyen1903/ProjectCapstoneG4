package js.footballclubmng.controller;

import js.footballclubmng.dto.PlayerDto;
import js.footballclubmng.dto.ResponseModel;
import js.footballclubmng.entity.Player;
import js.footballclubmng.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/player")
public class PlayerController {
    @Autowired
    PlayerService playerService;

    @GetMapping("/player-detail/{id}")
    public ResponseEntity<ResponseModel> playerDetail(@PathVariable int id){
        Optional<Player> player = playerService.getPlayerById(id);
        return player.isPresent()? ResponseEntity.status(HttpStatus.OK).body(new ResponseModel("true","",player))
                : ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseModel("false","không tìm thấy thông tin cầu thủ",null));
    }

    @GetMapping("/list-player")
    public ResponseEntity<ResponseModel> listPlayer(){
        List<PlayerDto> playerList = playerService.getAllPlayer();
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseModel("true","",playerList));
    }
}
