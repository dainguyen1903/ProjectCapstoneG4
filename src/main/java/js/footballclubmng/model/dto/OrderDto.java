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

    private String id;

    private float totalPrice;

    private LocalDateTime orderDate;

    private User user;

    private ShippingDto shipping;

    private EOrderStatus status;

    private List<OrderDetailDto> orderDetailList;


}
