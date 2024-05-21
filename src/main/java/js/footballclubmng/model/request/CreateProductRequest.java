package js.footballclubmng.model.request;


import js.footballclubmng.model.dto.ImagesProductDto;
import js.footballclubmng.model.dto.ProductSizeDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Range;

import javax.validation.constraints.*;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateProductRequest {
    @NotBlank(message = "Tên sản phẩm không được để trống")
    private String productName;

    @NotBlank(message = "Loại sản phẩm không được để trống")
    private String categoryId;

    @NotBlank(message = "Giá sản phẩm không được để trống")
    @Pattern(regexp = "^[0-9]+$", message = "Giá sản phẩm không hợp lệ! Vui lòng nhập số.")
    private String price;

    @NotBlank(message = "Chiết khấu sản phẩm không được để trống")
    @Pattern(regexp = "^(?:100|[1-9][0-9]?)$", message = "Khuyến mãi của sản phảm chỉ từ 0 đến 100%")
    private String discount;

    private Boolean isCustomise;

    @NotBlank(message = "Mô tả sản phẩm không được để trống")
    private String description;

    @NotEmpty(message = "Ảnh của sản phẩm không được để trống")
    private List<ImagesProductDto> ImagesProductList;

    @NotEmpty(message = "Size sản phẩm không được để trống")
    private List<ProductSizeDto> productSizeList;

}
