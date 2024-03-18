package js.footballclubmng.service;

import js.footballclubmng.entity.Product;
import js.footballclubmng.model.request.CreateProductRequest;

import java.util.List;


public interface ProductService {
    List<Product> getAllProduct();

    Product getProductById(long id);

    boolean createProduct(CreateProductRequest createProductRequest);

    public boolean updateProduct(long id, CreateProductRequest createProductRequest);

    public boolean deleteProduct(long id);


}
