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

    @Column(name = "shipper_id")
    private Long shipperId;


    @Column(name = "name")
    private String shipName;

    @Column(name = "phone")
    private String phone;

    @Column(name = "address")
    private String address;

    @Column(name = "district")
    private String district;

    @Column(name = "ward")
    private String ward;

    @Column(name = "province")
    private String province;

    @Column(name = "total_price")
    private Float totalPrice;

    @Column(name = "shipping_cost")
    private Float shippingCost;

    @Column(name = "desired_delivery_time")
    private Boolean desiredDeliveryTime;

    @Column(name = "note")
    private String note;

    @Column(name = "create_at")
    private LocalDateTime createAt;

    @Column(name = "update_at")
    private LocalDateTime updateAt;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private EShipStatus status;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "shipper_id",  insertable = false, updatable = false)
    private User shipper;



}
