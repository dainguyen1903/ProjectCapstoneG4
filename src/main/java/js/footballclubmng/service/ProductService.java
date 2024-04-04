package js.footballclubmng.service;

import js.footballclubmng.entity.Product;
import js.footballclubmng.model.dto.ProductDetailsDto;
import js.footballclubmng.model.dto.ProductDto;
import js.footballclubmng.model.request.CreateProductRequest;

import java.util.List;


public interface ProductService {

    List<ProductDto> getAllProduct();


    Product getProductById(long id);

    ProductDetailsDto getProductDetailsById(Long id);

    Product createProduct(CreateProductRequest createProductRequest);

    public boolean updateProduct(long id, CreateProductRequest createProductRequest);

    public boolean deleteProduct(long id);



    public List<Product> searchProduct(String product);


}
