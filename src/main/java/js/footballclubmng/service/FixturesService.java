package js.footballclubmng.service;

import js.footballclubmng.entity.Fixtures;

import java.util.List;

public interface FixturesService {
    public List<Fixtures> findAllFixtures();
    public Fixtures getFixturesById(long id);
    public boolean addMatch(Fixtures match);
    public boolean updateMatch(long id, Fixtures match);
    public boolean deleteMatch(long id);
}
