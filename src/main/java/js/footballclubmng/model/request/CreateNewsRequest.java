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
public class CreateNewsRequest {
    @NotBlank(message = "Loại tin không được để trống.")
    private String newsType;
    @NotBlank(message = "Tiêu đề không được để trống.")
    private String title;
    @NotBlank(message = "Mô tả không được để trống.")
    private String description;
}
