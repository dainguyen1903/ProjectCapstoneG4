package js.footballclubmng.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

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

    @Column(name = "ward")
    private String ward;

    @Column(name = "district")
    private String district;

    @Column(name = "province")
    private String province;

    @Column(name = "product_price")
    private Float productPrice;

    @Column(name = "shipping_fee")
    private Float shippingFee;

    @Column(name = "desired_delivery_time")
    private Boolean desiredDeliveryTime;

    @Column(name = "note")
    private String note;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "shipper_id",  insertable = false, updatable = false)
    private User shipper;



}
