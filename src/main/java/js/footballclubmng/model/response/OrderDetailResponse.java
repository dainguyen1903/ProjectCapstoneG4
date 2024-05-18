package js.footballclubmng.model.response;

import js.footballclubmng.enums.EOrderMethod;
import js.footballclubmng.enums.EOrderStatus;
import js.footballclubmng.model.dto.OrderDetailDto;
import js.footballclubmng.model.dto.ProductDto;
import js.footballclubmng.model.dto.ShippingDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderDetailResponse {
    private Long orderId;
    private String orderCode;
    private float totalPrice;
    private LocalDateTime orderDate;
    private EOrderMethod paymentMethod;
    private EOrderStatus orderStatus;
    private ShippingDto shipping;
    private List<OrderDetailDto> orderDetailDtoList;
}
