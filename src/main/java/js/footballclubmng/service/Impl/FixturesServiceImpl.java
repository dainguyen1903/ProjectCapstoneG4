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
    private FixturesRepository matchRepository;
    @Override
    public List<Fixtures> findAllFixtures() {
        List<Fixtures> matchList = matchRepository.viewAllFixtures();
        return matchList;
    }

    @Override
    public Fixtures getFixturesById(long id) {
        Fixtures fixtures  = matchRepository.findById(id).orElse(null);
        return fixtures;
    }

    @Override
    public boolean addMatch(Fixtures match) {
        return false;
    }

    @Override
    public boolean updateMatch(long id, Fixtures match) {
        return false;
    }

    @Override
    public boolean deleteMatch(long id) {
        return false;
    }
}
