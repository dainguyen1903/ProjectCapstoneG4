package js.footballclubmng.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "product")
public class Product {
    @Id
    @Column(name = "product_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String productName;

    @Column(name = "price")
    private float price;

    @Column(name = "discount")
    private float discount;

    @Column(name = "description")
    private String description;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id")
    @JsonIgnoreProperties({"listProducts"})
    private Category categoryId;

    @OneToMany(mappedBy = "product", fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    private List<ImagesProduct> imagesProductList;

    @Column(name = "is_customise")
    private Boolean isCustomise;
}
