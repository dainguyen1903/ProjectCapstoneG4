package js.footballclubmng.model.request.order;

import js.footballclubmng.entity.OrderDetail;
import js.footballclubmng.enums.EOrderMethod;
import js.footballclubmng.model.request.shipping.ShippingRequest;
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
public class CreateOrderRequest {

    private ShippingRequest shipping;

    private EOrderMethod paymentMethod;


}
