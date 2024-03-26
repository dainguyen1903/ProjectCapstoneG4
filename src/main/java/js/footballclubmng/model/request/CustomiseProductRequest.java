package js.footballclubmng.model.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CustomiseProductRequest {
    @NotBlank(message = "Vui lòng chọn size")
    private String size;
    private String playerName;
    private Integer playerNumber;
}
