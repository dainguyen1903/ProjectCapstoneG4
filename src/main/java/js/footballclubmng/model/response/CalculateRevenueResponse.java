package js.footballclubmng.model.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CalculateRevenueResponse {
    private Integer month;
    private Integer year;
    private Float sum;
}
