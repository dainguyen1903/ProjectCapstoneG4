package js.footballclubmng.controller;

import js.footballclubmng.common.CommonConstant;
import js.footballclubmng.model.dto.PlayerDto;
import js.footballclubmng.model.response.ResponseApi;
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

@RestController
public class PlayerController {
    @Autowired
    PlayerService playerService;

    @GetMapping(CommonConstant.PLAYER_API.DETAIL_PLAYER)
    public ResponseEntity<ResponseApi> playerDetail(@PathVariable int id) {
        Player player = playerService.getPlayerById(id).orElse(null);
        if (player == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseApi("false", "không tìm thấy thông tin cầu thủ", null));
        }
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseApi("true", null, player));
    }

    @GetMapping(CommonConstant.PLAYER_API.LIST_PLAYER)
    public ResponseEntity<ResponseApi> listPlayer() {
        List<PlayerDto> playerList = playerService.getAllPlayer();
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseApi("true", null, playerList));
    }
}
