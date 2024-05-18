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
    @Column(name = "category_name")
    private String name;

    @Column(name = "status")
    private Boolean status;

    @OneToMany(mappedBy = "category",fetch = FetchType.EAGER)
    private List<Product> listProducts;


}
