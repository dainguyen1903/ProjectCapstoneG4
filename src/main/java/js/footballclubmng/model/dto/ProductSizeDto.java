package js.footballclubmng.model.dto;


import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductSizeDto {
    private Long id;

    private String size;

    private int quantity;

}
