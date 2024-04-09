package js.footballclubmng.entity;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "cart_ticket_item")
public class CartTicketItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_ticket_item_id")
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "cart_ticket_id")
    private CartTicket cartTicket;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "fixtures_id")
    private Fixtures fixtures;

    @Column(name = "quantity")
    private Integer quantity;
}
