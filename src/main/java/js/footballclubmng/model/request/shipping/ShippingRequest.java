package js.footballclubmng.model.request.shipping;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ShippingRequest {

    private String shipName;
    private String phone;
    private String address;
    private String note;
}
