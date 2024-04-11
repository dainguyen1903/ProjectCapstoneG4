package js.footballclubmng.service;

import js.footballclubmng.entity.Fixtures;
import js.footballclubmng.model.dto.FixturesDto;

import java.util.List;

public interface FixturesService {
    public List<FixturesDto> findAllFixtures();
    public FixturesDto getFixturesById(long id);
    public boolean addFixtures(FixturesDto fixturesDto);
    public boolean updateFixtures(long id, FixturesDto fixtures);
    public boolean deleteFixtures(long id);
}
