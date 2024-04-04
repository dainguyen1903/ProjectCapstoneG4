package js.footballclubmng.model.dto;


import js.footballclubmng.entity.Player;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ImagesProductDto {

    private String path;

    private Long playerId;
}
