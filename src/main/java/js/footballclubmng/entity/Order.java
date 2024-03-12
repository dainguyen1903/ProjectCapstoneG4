package js.footballclubmng.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "order")
public class Order {
    @Id
    @Column(name = "order_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "total_price")
    private Float total;
    @Column(name = "order_date")
    private Date orderDate;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "shipping_id")
    @JsonIgnore
    private Shipping shipping;
}
