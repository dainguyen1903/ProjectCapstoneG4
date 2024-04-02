package js.footballclubmng.service.Impl;

import js.footballclubmng.entity.Fixtures;
import js.footballclubmng.repository.FixturesRepository;
import js.footballclubmng.service.FixturesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FixturesServiceImpl implements FixturesService {

    @Autowired
    private FixturesRepository fixtureRepository;
    @Override
    public List<Fixtures> findAllFixtures() {
        List<Fixtures> matchList = fixtureRepository.viewAllFixtures();
        return matchList;
    }

    @Override
    public Fixtures getFixturesById(long id) {
        Fixtures fixtures  = fixtureRepository.findById(id).orElse(null);
        return fixtures;
    }

    @Override
    public boolean addFixtures(Fixtures fixtures) {
        try {
            Fixtures fixtures1 = new Fixtures();
            fixtures1.setName(fixtures.getName());
            fixtures1.setRound(fixtures.getRound());
            fixtures1.setHomeTeam(fixtures.getHomeTeam());
            fixtures1.setAwayTeam(fixtures.getAwayTeam());
            fixtures1.setDateTime(fixtures.getDateTime());
            fixtures1.setLocation(fixtures.getLocation());
            fixtures1.setStatusMatch(fixtures.getStatusMatch());
            fixtures1.setHomeScore(fixtures.getHomeScore());
            fixtures1.setAwayScore(fixtures.getAwayScore());
            fixtures1.setStatus(true);
            fixtureRepository.save(fixtures1);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean updateFixtures(long id, Fixtures fixtures) {
        try {
            Fixtures fixtures1 = fixtureRepository.findById(id).orElse(null);
            if (fixtures1 == null) {
                return false;
            }
            fixtures1.setName(fixtures.getName());
            fixtures1.setRound(fixtures.getRound());
            fixtures1.setHomeTeam(fixtures.getHomeTeam());
            fixtures1.setAwayTeam(fixtures.getAwayTeam());
            fixtures1.setDateTime(fixtures.getDateTime());
            fixtures1.setLocation(fixtures.getLocation());
            fixtures1.setStatusMatch(fixtures.getStatusMatch());
            fixtures1.setHomeScore(fixtures.getHomeScore());
            fixtures1.setAwayScore(fixtures.getAwayScore());
            fixtureRepository.save(fixtures1);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean deleteFixtures(long id) {
        try {
            Fixtures fixtures = fixtureRepository.findById(id).orElse(null);
            fixtures.setStatus(false);
            fixtureRepository.save(fixtures);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
