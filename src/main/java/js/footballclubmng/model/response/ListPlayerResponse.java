package js.footballclubmng.model.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ListPlayerResponse {
    private Long playerNumber;
    private String name;
    private String nationality;
    private String position;
}
