package js.footballclubmng.entity;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private Long id;

    @NotBlank(message = "Tên không được để trống.")
    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "categoryId",fetch = FetchType.EAGER)
    private List<Product> listProducts;

}
