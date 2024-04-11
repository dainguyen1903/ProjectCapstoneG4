package js.footballclubmng.model.dto;

import js.footballclubmng.enums.EShipStatus;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ShippingDto {
    private String name;
    private String phone;
    private String address;
    private Float totalPrice;
    private String note;
    private LocalDateTime createAt;
    private LocalDateTime updatedAt;
    private EShipStatus status;

}
