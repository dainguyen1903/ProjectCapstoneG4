package js.footballclubmng.model.request;

import js.footballclubmng.entity.Category;
import js.footballclubmng.entity.ImagesProduct;
import js.footballclubmng.entity.ProductSize;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateProductRequest {
    @NotBlank(message = "Tên sản phẩm không được để trống")
    private String productName;
    @NotBlank(message = "Loại sản phẩm không được để trống")
    private String categoryName;
    @NotNull(message = "Giá sản phẩm không được trống")
    private float price;
    @NotNull(message = "Chiết khấu không được trống")
    @Min(value = 0, message = "chiết khẩu sản phẩm phải lớn hơn hoặc bằng 0")
    @Max(value = 100, message = "chiết khẩu sản phẩm phải nhỏ hơn hoặc bằng 100")
    private float discount;

    private String description;

    private List<ImagesProduct> ImagesProductList;

    private List<ProductSize> productSizeList;

}
