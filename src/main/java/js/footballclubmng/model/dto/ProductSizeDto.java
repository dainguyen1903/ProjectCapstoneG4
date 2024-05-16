package js.footballclubmng.model.dto;


import lombok.*;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductSizeDto {
    @NotBlank(message = "Size không được để trống")
    private String size;
    @NotBlank(message = "Số lượng không được để trống")
    private int quantity;

}
