package js.footballclubmng.service;

import js.footballclubmng.entity.Fixtures;

import java.util.List;

public interface FixturesService {
    public List<Fixtures> findAllFixtures();
    public Fixtures getFixturesById(long id);
    public boolean addFixtures(Fixtures fixtures);
    public boolean updateFixtures(long id, Fixtures fixtures);
    public boolean deleteMatch(long id);
}
