package js.footballclubmng.model.response;


import js.footballclubmng.entity.Cart;
import js.footballclubmng.entity.Player;
import js.footballclubmng.model.dto.ProductDetailsDto;
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
    private int quantity;
    private String size;
    private Player player;
    private ProductDetailsDto product;
}
