package js.footballclubmng.model.dto;

import js.footballclubmng.entity.Product;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderDetailDto {

    private float unitPrice;
    private int quantity;
    private String size;
    private ProductDto product;
}
