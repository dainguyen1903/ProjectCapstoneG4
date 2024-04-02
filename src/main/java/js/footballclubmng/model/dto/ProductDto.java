package js.footballclubmng.model.dto;

import js.footballclubmng.entity.Category;
import js.footballclubmng.entity.ImagesProduct;
import js.footballclubmng.entity.ProductSize;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductDto {
    private Long id;

    private String productName;

    private float price;

    private float discount;

    private String description;

    private Boolean status;

    private Boolean isCustomise;

    private Category category;

    private List<String> imagesProductList;

//    private List<ProductSize> productSizeList;
}
