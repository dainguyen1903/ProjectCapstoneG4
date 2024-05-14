package js.footballclubmng.model.response;

import js.footballclubmng.model.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ListShippingResponse {
    private Long id;
    private UserDto shipperName;
    private String shipName;
    private String phone;
    private String district;
    private String ward;
    private String province;
    private String address;
    private Float productPrice;
    private Float shippingFee;
    private Boolean desiredDeliveryTime;
    private String note;

}
