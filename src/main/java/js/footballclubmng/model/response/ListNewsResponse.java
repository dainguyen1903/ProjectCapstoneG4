package js.footballclubmng.model.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ListNewsResponse {
    private Long id;
    private String title;
    private LocalDateTime dateCreate;
}
