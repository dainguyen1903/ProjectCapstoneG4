package js.footballclubmng.model.response;

import js.footballclubmng.model.dto.ProductDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderDetailResponse {
    private ProductDto productDto;
    private float unitPrice;
    private String size;
    private int quantity;
}
