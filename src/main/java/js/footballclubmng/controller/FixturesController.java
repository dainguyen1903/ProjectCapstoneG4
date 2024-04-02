package js.footballclubmng.controller;

import js.footballclubmng.common.CommonConstant;
import js.footballclubmng.entity.Fixtures;
import js.footballclubmng.model.response.ResponseAPI;
import js.footballclubmng.service.FixturesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class FixturesController {
    @Autowired
    private FixturesService matchService;

    @GetMapping(CommonConstant.FIXTURES_API.FIXTURES_LIST)
    public ResponseAPI<List<Fixtures>> listMatch() {
        List<Fixtures> list = matchService.findAllFixtures();
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, null, list);
    }

    @GetMapping(CommonConstant.FIXTURES_API.FIXTURES_DETAIL)
    public ResponseAPI<Fixtures> matchDetail(@PathVariable int id) {
        Fixtures match = matchService.getFixturesById(id);
        if (match == null) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.EMPTY, CommonConstant.COMMON_MESSAGE.NOT_FOUND_FIXTURES, null);
        }
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, null, match);
    }
}
