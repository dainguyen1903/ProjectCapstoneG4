package js.footballclubmng.model.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Builder
public class ProductDetailsDto {
    private Long id;

    private String productName;

    private float price;

    private float discount;

    private String description;

    private Boolean status;

    private Boolean isCustomise;

    private CategoryDto category;

    private List<ImagesProductDto> imagesProductDtoList;

    private List<ProductSizeDto> productSizeDtoList;

    public ProductDetailsDto(Long id, String productName, float price, float discount, String description, Boolean status, Boolean isCustomise, CategoryDto category, List<ImagesProductDto> imagesProductDtoList, List<ProductSizeDto> productSizeDtoList) {
        this.id = id;
        this.productName = productName;
        this.price = price;
        this.discount = discount;
        this.description = description;
        this.status = status;
        this.isCustomise = isCustomise;
        this.category = category;
        this.imagesProductDtoList = imagesProductDtoList;
        this.productSizeDtoList = productSizeDtoList;
    }
}
