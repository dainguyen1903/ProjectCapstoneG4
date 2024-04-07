package js.footballclubmng.model.response;


import js.footballclubmng.entity.Cart;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ListCartItemsResponse {
    private Long cartItemId;
    private Long productId;
    private int quantity;
    private String size;
    private String playerName;
    private Integer playerNumber;
}
