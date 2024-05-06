package js.footballclubmng.model.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ShipStatusDto {
    private Long id;
    private String shipStatusName;
}
