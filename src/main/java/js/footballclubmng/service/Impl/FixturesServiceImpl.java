package js.footballclubmng.service.Impl;

import js.footballclubmng.entity.Fixtures;
import js.footballclubmng.entity.News;
import js.footballclubmng.model.dto.FixturesDto;
import js.footballclubmng.model.response.ListNewsResponse;
import js.footballclubmng.repository.FixturesRepository;
import js.footballclubmng.service.FixturesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FixturesServiceImpl implements FixturesService {

    @Autowired
    private FixturesRepository fixtureRepository;

    @Override
    public List<FixturesDto> findAllFixtures() {
        List<Fixtures> matchList = fixtureRepository.viewAllFixtures();
        return matchList.stream()
                .map((fixtures) -> mapToFixturesDto(fixtures))
                .collect(Collectors.toList());
    }

    @Override
    public FixturesDto getFixturesById(long id) {
        Fixtures fixtures1 = fixtureRepository.findById(id).orElse(null);
        if (fixtures1 == null) {
            return null;
        }
        return mapToFixturesDto(fixtures1);
    }

    @Override
    public boolean addFixtures(FixturesDto fixtures) {
        try {
            Fixtures fixtures1 = new Fixtures();
            fixtures1.setName(fixtures.getName());
            fixtures1.setRound(fixtures.getRound());
            fixtures1.setHomeTeam(fixtures.getHomeTeam());
            fixtures1.setImageHomeTeam(fixtures.getImageHomeTeam());
            fixtures1.setAwayTeam(fixtures.getAwayTeam());
            fixtures1.setImageAwayTeam(fixtures.getImageAwayTeam());
            fixtures1.setDateTime(LocalDateTime.parse(fixtures.getDateTime()));
            fixtures1.setLocation(fixtures.getLocation());
            fixtures1.setStatusMatch(fixtures.getStatusMatch());
            if (fixtures.getHomeScore() != null && !fixtures.getHomeScore().isEmpty()) {
                fixtures1.setHomeScore(Integer.valueOf(fixtures.getHomeScore()));
            }
            if (fixtures.getAwayScore() != null && !fixtures.getAwayScore().isEmpty()) {
                fixtures1.setAwayScore(Integer.valueOf(fixtures.getAwayScore()));
            }
            fixtures1.setNumberOfTicket(Integer.valueOf(fixtures.getNumberOfTicket()));
            fixtures1.setPriceOfTicket(Double.valueOf(fixtures.getPriceOfTicket()));
            fixtures1.setNumberOfTicketsSold(0);
            fixtures1.setStatus(true);
            fixtureRepository.save(fixtures1);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean updateFixtures(long id, FixturesDto fixtures) {
        try {
            Fixtures fixtures1 = fixtureRepository.findById(id).orElse(null);
            if (fixtures1 == null) {
                return false;
            }
            fixtures1.setName(fixtures.getName());
            fixtures1.setRound(fixtures.getRound());
            fixtures1.setHomeTeam(fixtures.getHomeTeam());
            fixtures1.setImageHomeTeam(fixtures.getImageHomeTeam());
            fixtures1.setAwayTeam(fixtures.getAwayTeam());
            fixtures1.setImageAwayTeam(fixtures.getImageAwayTeam());
            fixtures1.setDateTime(LocalDateTime.parse(fixtures.getDateTime()));
            fixtures1.setLocation(fixtures.getLocation());
            fixtures1.setStatusMatch(fixtures.getStatusMatch());
            if (fixtures.getHomeScore() != null && !fixtures.getHomeScore().isEmpty()) {
                fixtures1.setHomeScore(Integer.valueOf(fixtures.getHomeScore()));
            }
            if (fixtures.getAwayScore() != null && !fixtures.getAwayScore().isEmpty()) {
                fixtures1.setAwayScore(Integer.valueOf(fixtures.getAwayScore()));
            }
            fixtures1.setNumberOfTicket(Integer.valueOf(fixtures.getNumberOfTicket()));
            fixtures1.setPriceOfTicket(Double.valueOf(fixtures.getPriceOfTicket()));
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

    private FixturesDto mapToFixturesDto(Fixtures fixtures) {
        FixturesDto fixturesDto = new FixturesDto();
        fixturesDto.setId(fixtures.getId());
        fixturesDto.setName(fixtures.getName());
        fixturesDto.setRound(fixtures.getRound());
        fixturesDto.setHomeTeam(fixtures.getHomeTeam());
        fixturesDto.setImageHomeTeam(fixtures.getImageHomeTeam());
        fixturesDto.setAwayTeam(fixtures.getAwayTeam());
        fixturesDto.setImageAwayTeam(fixtures.getImageAwayTeam());
        fixturesDto.setDateTime(String.valueOf(fixtures.getDateTime()));
        fixturesDto.setLocation(fixtures.getLocation());
        fixturesDto.setStatusMatch(fixtures.getStatusMatch());
        fixturesDto.setHomeScore(String.valueOf(fixtures.getHomeScore()));
        fixturesDto.setAwayScore(String.valueOf(fixtures.getAwayScore()));
        fixturesDto.setNumberOfTicket(String.valueOf(fixtures.getNumberOfTicket()));
        fixturesDto.setPriceOfTicket(String.valueOf(fixtures.getPriceOfTicket()));
        fixturesDto.setNumberOfTicketsSold(fixtures.getNumberOfTicketsSold());
        fixturesDto.setStatus(fixtures.getStatus());
        return fixturesDto;
    }
}
