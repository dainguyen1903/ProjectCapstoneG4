package js.footballclubmng.controller;

import js.footballclubmng.common.CommonConstant;

import js.footballclubmng.entity.Player;
import js.footballclubmng.model.response.ListPlayerResponse;
import js.footballclubmng.model.response.ResponseAPI;
import js.footballclubmng.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
public class PlayerController {
    @Autowired
    PlayerService playerService;

    @GetMapping(CommonConstant.PLAYER_API.DETAIL_PLAYER)
    public ResponseAPI<Player> playerDetail(@PathVariable int id) {
        Player player = playerService.getPlayerById(id).orElse(null);
        if (player == null) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.EMPTY, CommonConstant.COMMON_MESSAGE.NOT_FOUND_PLAYER);
        }
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, null, player);
    }

    @GetMapping(CommonConstant.PLAYER_API.LIST_PLAYER)
    @PreAuthorize("hasRole('ROLE_Staff')")
    public ResponseAPI<List<ListPlayerResponse>> listPlayer() {
        List<ListPlayerResponse> playerList = playerService.getAllPlayer();
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK,null,playerList);
    }
}
