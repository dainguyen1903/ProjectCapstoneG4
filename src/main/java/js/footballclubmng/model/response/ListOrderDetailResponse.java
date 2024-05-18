package js.footballclubmng.model.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ListOrderDetailResponse {
    private Long id;
    private String productName;
    private float productPrice;
    private Integer playerNumber;
    private String playerName;
    private String size;
    private Long productId;
    private Long orderId;
}
