package js.footballclubmng.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

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
    private long id;

    @Column(name = "total_price")
    private float totalPrice;

    @Column(name = "order_date")
    private LocalDateTime orderDate;

    @OneToOne
    @JoinColumn(name = "product_id")
    private Product productId;


}
