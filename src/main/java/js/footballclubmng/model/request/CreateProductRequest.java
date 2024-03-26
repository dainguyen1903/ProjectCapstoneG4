package js.footballclubmng.model.request;

import js.footballclubmng.entity.Category;
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
    @NotBlank(message = "Giá trị kích cỡ không được để trống")
    private String size;
    @NotNull(message = "Số lượng phẩm không được trống")
    private  Integer quantity;

    private String description;

    private List<String> ImagesProductList;
    private Boolean isCustomise;

}
