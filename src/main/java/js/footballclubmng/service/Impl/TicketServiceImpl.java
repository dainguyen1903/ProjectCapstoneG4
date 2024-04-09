package js.footballclubmng.service.Impl;

import js.footballclubmng.config.TokenProvider;
import js.footballclubmng.entity.Fixtures;
import js.footballclubmng.entity.Ticket;
import js.footballclubmng.entity.User;
import js.footballclubmng.repository.FixturesRepository;
import js.footballclubmng.repository.TicketRepository;
import js.footballclubmng.repository.UserRepository;
import js.footballclubmng.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TicketServiceImpl implements TicketService {
    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private FixturesRepository fixturesRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenProvider tokenProvider;

    @Override
    public boolean addTicket(Long fixturesId, String token, Integer quantity) {
        try {
            Fixtures fixtures = fixturesRepository.findById(fixturesId).orElse(null);
            String jwtToken = token.substring(7);
            String email = tokenProvider.getUsernameFromJWT(jwtToken);
            User user = userRepository.findByEmail(email);

            Ticket ticket = new Ticket();
            ticket.setFixtures(fixtures);
            ticket.setUser1(user);
            ticket.setQuantity(quantity);
            ticketRepository.save(ticket);
            fixtures.setNumberOfTicket(fixtures.getNumberOfTicket() - quantity);
            fixturesRepository.save(fixtures);
            return true;
        }catch (Exception e){
            return false;
        }
    }
}
