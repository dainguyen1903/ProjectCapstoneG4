package js.footballclubmng.model.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderDetailDto {

    private Long id;
    private float unitPrice;
    private int quantity;
    private String size;
    private Long productId; // ID của sản phẩm liên quan đến chi tiết đơn hàng
}
