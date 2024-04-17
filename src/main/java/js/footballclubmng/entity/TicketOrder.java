package js.footballclubmng.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "ticket_order")
public class TicketOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ticket_order_id")
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
//    @JsonIgnoreProperties("ticketOrders")
    @JsonIgnore
    private User user1;

    @Column(name = "create_time_ticket_order")
    private LocalDateTime createTime;

    @Column(name = "total_price")
    private double totalPrice;

//    @OneToMany(mappedBy = "ticketOrders", fetch = FetchType.EAGER)
//    private List<TicketOrderDetail> ticketOrderDetail;
}
