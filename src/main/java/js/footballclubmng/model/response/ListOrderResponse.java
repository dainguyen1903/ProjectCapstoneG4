package js.footballclubmng.model.response;

import js.footballclubmng.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ListOrderResponse {
    private Long id;
    private String email;
    private float totalPrice;
    private LocalDateTime orderDate;


}
