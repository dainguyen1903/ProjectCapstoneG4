package js.footballclubmng.model.dto;

import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ShippingDto {
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
