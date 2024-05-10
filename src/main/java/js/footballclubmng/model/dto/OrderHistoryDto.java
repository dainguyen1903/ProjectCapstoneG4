package js.footballclubmng.model.dto;

import js.footballclubmng.enums.EOrderMethod;
import js.footballclubmng.enums.EOrderStatus;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderHistoryDto {
    private String orderCode;
    private float totalPrice;
    private LocalDateTime orderDate;
    private EOrderMethod paymentMethod;
    private EOrderStatus orderStatus;
    private List<OrderDetailDto> orderDetailDtoList;
}
