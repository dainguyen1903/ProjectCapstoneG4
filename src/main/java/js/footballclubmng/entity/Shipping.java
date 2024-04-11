package js.footballclubmng.entity;

import js.footballclubmng.enums.EOrderStatus;
import js.footballclubmng.enums.EShipStatus;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "shipping")
public class Shipping {
    @Id
    @Column(name = "shipping_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String shipName;

    @Column(name = "phone")
    private String phone;

    @Column(name = "address")
    private String address;

    @Column(name = "total_price")
    private Float totalPrice;

    @Column(name = "note")
    private String note;

    @Column(name = "create_at")
    private LocalDateTime createAt;

    @Column(name = "update_at")
    private LocalDateTime updateAt;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private EShipStatus status;


}
