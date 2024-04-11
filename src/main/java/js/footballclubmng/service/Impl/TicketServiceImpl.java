package js.footballclubmng.service.Impl;

import js.footballclubmng.common.MapperUtil;
import js.footballclubmng.config.TokenProvider;
import js.footballclubmng.entity.*;
import js.footballclubmng.model.dto.FixturesDto;
import js.footballclubmng.model.response.ListCartTicketItemResponse;
import js.footballclubmng.repository.*;
import js.footballclubmng.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TicketServiceImpl implements TicketService {
    @Autowired
    private FixturesRepository fixturesRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
    private TicketOrderRepository ticketOrderRepository;

    @Autowired
    private TicketOrderDetailRepository ticketOrderDetailRepository;

    @Autowired
    CartTicketRepository cartTicketRepository;

    @Autowired
    CartTicketItemRepository cartTicketItemRepository;

    @Override
    public boolean addOrderTicket(String token, Float totalprice) {
        try {
            String jwtToken = token.substring(7);
            String email = tokenProvider.getUsernameFromJWT(jwtToken);
            User user = userRepository.findByEmail(email);
            CartTicket cartTicket = cartTicketRepository.findByUser(user);
            List<CartTicketItem> list = cartTicketItemRepository.findAllByCartTicket(cartTicket);
            List<ListCartTicketItemResponse> listTicket = list.stream()
                    .map(MapperUtil::mapToListCartTicketItemsResponses)
                    .collect(Collectors.toList());
            TicketOrder ticketOrder = new TicketOrder();
            ticketOrder.setUser1(user);
            ticketOrder.setTotalPrice(totalprice);
            ticketOrder.setCreateTime(LocalDateTime.now());
            ticketOrderRepository.save(ticketOrder);
            for (ListCartTicketItemResponse item : listTicket) {
                TicketOrderDetail ticketOrderDetail = new TicketOrderDetail();
                ticketOrderDetail.setTicketPrice(item.getFixtures().getPriceOfTicket());
                ticketOrderDetail.setQuantity(item.getQuantity());
                ticketOrderDetail.setTicketOrders(ticketOrder);
                FixturesDto fixturesDto = item.getFixtures();
                Fixtures fixtures = fixturesRepository.findById(fixturesDto.getId()).orElse(null);
                if (fixtures == null) {
                    return false;
                }
                fixtures.setNumberOfTicket(fixtures.getNumberOfTicket() - item.getQuantity());
                fixtures.setNumberOfTicketsSold(fixtures.getNumberOfTicketsSold() + item.getQuantity());
                fixturesRepository.save(fixtures);
                ticketOrderDetail.setFixtures(fixtures);
                ticketOrderDetailRepository.save(ticketOrderDetail);
            }
            for (CartTicketItem item : list) {
                CartTicketItem cartTicketItem = cartTicketItemRepository.findById(item.getId()).orElse(null);
                if (cartTicketItem == null) {
                    return false;
                }
                cartTicketItemRepository.delete(cartTicketItem);
            }
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
