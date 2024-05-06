package js.footballclubmng.model.response;

import js.footballclubmng.entity.User;
import js.footballclubmng.enums.EShipStatus;
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
    private String address;
    private Float totalPrice;
    private String note;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
    private EShipStatus status;



}