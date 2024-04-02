package js.footballclubmng.controller;

import js.footballclubmng.common.CommonConstant;
import js.footballclubmng.entity.Fixtures;
import js.footballclubmng.model.response.ResponseAPI;
import js.footballclubmng.service.FixturesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class FixturesController {
    @Autowired
    private FixturesService fixturesService;

    @GetMapping(CommonConstant.FIXTURES_API.FIXTURES_LIST)
    public ResponseAPI<List<Fixtures>> listMatch() {
        List<Fixtures> list = fixturesService.findAllFixtures();
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, null, list);
    }

    @GetMapping(CommonConstant.FIXTURES_API.FIXTURES_DETAIL)
    public ResponseAPI<Fixtures> fixturesDetail(@PathVariable int id) {
        Fixtures fixtures = fixturesService.getFixturesById(id);
        if (fixtures == null) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.EMPTY, CommonConstant.COMMON_MESSAGE.NOT_FOUND_FIXTURES, null);
        }
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, null, fixtures);
    }

    @PostMapping(CommonConstant.FIXTURES_API.CREATE_FIXTURES)
    @PreAuthorize("hasRole('ROLE_Operator')")
    public ResponseAPI<Fixtures> createFixtures(@RequestBody Fixtures fixtures) {
        boolean result = fixturesService.addFixtures(fixtures);
        if (!result) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.ADD_FIXTURES_FAIL, null);
        }
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, CommonConstant.COMMON_MESSAGE.ADD_FIXTURES_SUCCESS, null);
    }
}
