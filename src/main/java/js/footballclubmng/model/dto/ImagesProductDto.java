package js.footballclubmng.model.dto;


import js.footballclubmng.entity.Player;
import lombok.*;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ImagesProductDto {
    @NotBlank(message = "Ảnh không được để trống")
    private String path;

}
