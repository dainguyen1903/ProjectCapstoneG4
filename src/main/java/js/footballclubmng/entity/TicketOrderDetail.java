package js.footballclubmng.entity;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "ticket_order_detail")
public class TicketOrderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ticket_order_detail_id")
    private Long id;

    @Column(name = "ticket_price")
    private double ticketPrice;

    @Column(name = "quantity")
    private int quantity;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ticket_order_id")
    private TicketOrder ticketOrders;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "fixtures_id")
    private Fixtures fixtures;
}
