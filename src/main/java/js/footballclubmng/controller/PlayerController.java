package js.footballclubmng.controller;

import js.footballclubmng.common.CommonConstant;

import js.footballclubmng.entity.Player;
import js.footballclubmng.model.dto.PlayerDto;
import js.footballclubmng.model.response.ListPlayerResponse;
import js.footballclubmng.model.response.ResponseAPI;
import js.footballclubmng.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@RestController
public class PlayerController {
    @Autowired
    PlayerService playerService;

    @GetMapping(CommonConstant.PLAYER_API.DETAIL_PLAYER)
    public ResponseAPI<Player> playerDetail(@PathVariable int id) {
        Player player = playerService.getPlayerById(id);
        if (player == null) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.EMPTY, CommonConstant.COMMON_MESSAGE.NOT_FOUND_PLAYER);
        }
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, null, player);
    }

    @GetMapping(CommonConstant.PLAYER_API.LIST_PLAYER)

    public ResponseAPI<List<ListPlayerResponse>> listPlayer() {
        List<ListPlayerResponse> playerList = playerService.getAllPlayer();
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, null, playerList);
    }

    @PostMapping(CommonConstant.PLAYER_API.CREATE_PLAYER)
    @PreAuthorize("hasRole('ROLE_Operator')")
    public ResponseAPI<Object> createPlayer(@RequestBody @Valid PlayerDto player) {
        boolean checkDate = playerService.isDateInThePast(player.getDateOfBirth());
        if (!checkDate) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.DATE_IN_THE_PAST);
        }
        boolean checkNumber = playerService.checkPlayerNumberExist(Long.valueOf(player.getPlayerNumber()));
        if (!checkNumber) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.PLAYER_NUMBER_EXIST);
        }
        boolean check = playerService.createPlayer(player);
        if (!check) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.CREATE_PLAYER_FAIL);
        }
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, CommonConstant.COMMON_MESSAGE.CREATE_PLAYER_SUCCESS);
    }

    @PutMapping(CommonConstant.PLAYER_API.UPDATE_PLAYER)
    @PreAuthorize("hasRole('ROLE_Operator')")
    public ResponseAPI<Object> updatePlayer(@PathVariable int id, @RequestBody @Valid PlayerDto player) {
        Player p = playerService.getPlayerById(id);
        if (p == null) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.EMPTY, CommonConstant.COMMON_MESSAGE.NOT_FOUND_PLAYER);
        }
        boolean checkDate = playerService.isDateInThePast(player.getDateOfBirth());
        if (!checkDate) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.DATE_IN_THE_PAST);
        }
        if (p.getPlayerNumber() != Long.valueOf(player.getPlayerNumber())) {
            boolean checkNumber = playerService.checkPlayerNumberExist(Long.valueOf(player.getPlayerNumber()));
            if (!checkNumber) {
                return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.PLAYER_NUMBER_EXIST);
            }
        }
        boolean check = playerService.updatePlayer(id, player);
        if (!check) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.UPDATE_PLAYER_FAIL);
        }
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, CommonConstant.COMMON_MESSAGE.UPDATE_PLAYER_SUCCESS);
    }

    @DeleteMapping(CommonConstant.PLAYER_API.DELETE_PLAYER)
    @PreAuthorize("hasRole('ROLE_Operator')")
    public ResponseAPI<Object> deletePlayer(@PathVariable int id) {
        Player p = playerService.getPlayerById(id);
        if (p == null) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.EMPTY, CommonConstant.COMMON_MESSAGE.NOT_FOUND_PLAYER);
        }
        boolean check = playerService.deletePlayer(id);
        if (!check) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.DELETE_PLAYER_FAIL);
        }
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, CommonConstant.COMMON_MESSAGE.DELETE_PLAYER_SUCCESS);
    }

    @GetMapping(CommonConstant.PLAYER_API.SEARCH_PLAYER)
    public ResponseAPI<List<Player>> searchPlayer(@RequestParam("query") String search) {
        List<Player> playerList = playerService.searchPlayer(search);
        if(playerList.isEmpty()) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.EMPTY, CommonConstant.COMMON_MESSAGE.NOT_FOUND_PLAYER);
        }
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, null, playerList);
    }

}
