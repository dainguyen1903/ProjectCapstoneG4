package js.footballclubmng.controller;

import js.footballclubmng.common.CommonConstant;
import js.footballclubmng.entity.Fixtures;
import js.footballclubmng.model.dto.FixturesDto;
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
    public ResponseAPI<List<FixturesDto>> listMatch() {
        List<FixturesDto> list = fixturesService.findAllFixtures();
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, null, list);
    }

    @GetMapping(CommonConstant.FIXTURES_API.FIXTURES_DETAIL)
    public ResponseAPI<FixturesDto> fixturesDetail(@PathVariable int id) {
        FixturesDto fixtures = fixturesService.getFixturesById(id);
        if (fixtures == null) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.EMPTY, CommonConstant.COMMON_MESSAGE.NOT_FOUND_FIXTURES, null);
        }
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, null, fixtures);
    }

    @PostMapping(CommonConstant.FIXTURES_API.CREATE_FIXTURES)
    @PreAuthorize("hasRole('ROLE_Operator')")
    public ResponseAPI<Fixtures> createFixtures(@RequestBody FixturesDto fixtures) {
        boolean result = fixturesService.addFixtures(fixtures);
        if (!result) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.ADD_FIXTURES_FAIL, null);
        }
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, CommonConstant.COMMON_MESSAGE.ADD_FIXTURES_SUCCESS, null);
    }

    @PutMapping(CommonConstant.FIXTURES_API.UPDATE_FIXTURES)
    @PreAuthorize("hasRole('ROLE_Operator')")
    public ResponseAPI<Fixtures> updateFixtures(@PathVariable int id, @RequestBody FixturesDto fixtures) {
        FixturesDto fixtures1 = fixturesService.getFixturesById(id);
        if (fixtures1 == null) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.EMPTY, CommonConstant.COMMON_MESSAGE.NOT_FOUND_FIXTURES, null);
        }
        boolean result = fixturesService.updateFixtures(id, fixtures);
        if (!result) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.UPDATE_FIXTURES_FAIL, null);
        }
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, CommonConstant.COMMON_MESSAGE.UPDATE_FIXTURES_SUCCESS, null);
    }

    @DeleteMapping(CommonConstant.FIXTURES_API.DELETE_FIXTURES)
    @PreAuthorize("hasRole('ROLE_Operator')")
    public ResponseAPI<Fixtures> deleteFixtures(@PathVariable int id) {
        FixturesDto fixtures = fixturesService.getFixturesById(id);
        if (fixtures == null) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.EMPTY, CommonConstant.COMMON_MESSAGE.NOT_FOUND_FIXTURES, null);
        }
        boolean result = fixturesService.deleteFixtures(id);
        if (!result) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.DELETE_FIXTURES_FAIL, null);
        }
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, CommonConstant.COMMON_MESSAGE.DELETE_FIXTURES_SUCCESS, null);
    }
}
