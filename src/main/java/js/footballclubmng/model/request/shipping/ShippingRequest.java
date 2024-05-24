package js.footballclubmng.model.request.shipping;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ShippingRequest {
    @NotBlank(message = "Tên người nhận hàng không được trống")
    private String shipName;
    @Pattern(regexp="[0-9]{10}", message = "Số điện thoại phải có 10 chữ số")
    private String phone;
    @NotNull
    private String ward;
    @NotNull
    private String district;
    @NotNull
    private String province;
    @NotNull
    private String address;
    @NotNull
    private Boolean desiredDeliveryTime;

    private String note;
}
