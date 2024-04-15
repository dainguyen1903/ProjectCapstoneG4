package js.footballclubmng.service;

import js.footballclubmng.entity.ImagesProduct;
import js.footballclubmng.entity.Product;
import js.footballclubmng.model.dto.ProductDetailsDto;
import js.footballclubmng.model.dto.ProductDto;
import js.footballclubmng.model.request.CreateProductRequest;

import java.util.List;


public interface ProductService {
    List<ProductDto> getAllProduct();
    Product getProductById(Long id);
    ProductDetailsDto getProductDetailsById(Long id);
    Product createProduct(CreateProductRequest createProductRequest);
    public boolean updateProduct(Long id, CreateProductRequest createProductRequest);
    public boolean deleteProduct(Long id);
    public List<ProductDto> searchProduct(String productName);

    public String getImageProductByPlayer(Long productId, Long playerNumber);

}
