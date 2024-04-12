package js.footballclubmng.model.dto;

import js.footballclubmng.entity.User;
import js.footballclubmng.enums.EOrderStatus;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderDto {

    private Long id;

    private float totalPrice;

    private LocalDateTime orderDate;

    private UserDto user;

    private ShippingDto shipping;

    private EOrderStatus status;



}
