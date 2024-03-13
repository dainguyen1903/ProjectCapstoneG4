package js.footballclubmng.service.Impl;

import js.footballclubmng.entity.Category;
import js.footballclubmng.entity.News;
import js.footballclubmng.entity.NewsType;
import js.footballclubmng.entity.Product;
import js.footballclubmng.model.request.CreateProductRequest;
import js.footballclubmng.repository.CategoryRepository;
import js.footballclubmng.repository.ProductRepository;
import js.footballclubmng.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;


    public List<Product> getAllProduct() {
        List<Product> list;
        list = productRepository.findAll();
        return list;
    }

    @Override
    public Product getProductById(long id) {
        Product product = productRepository.findById(id).orElse(null);
        return product;
    }

    @Override
    public boolean createProduct(CreateProductRequest createProductRequest) {
        try {
            Category category = categoryRepository.findByName(createProductRequest.getCategoryName());

            Product productEntity = new Product();
            productEntity.setProductName(createProductRequest.getProductName());
            productEntity.setPrice(createProductRequest.getPrice());
            productEntity.setDiscount(createProductRequest.getDiscount());
            productEntity.setSize(createProductRequest.getSize());
            productEntity.setDescription(createProductRequest.getDescription());
            productEntity.setQuantity(createProductRequest.getQuantity());
            productEntity.setCategoryId(category);
            productRepository.save(productEntity);
            return true;

        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean updateProduct(long id, CreateProductRequest createProductRequest) {
        try {
            Product product = productRepository.findById(id).orElse(null);
            if (product != null) {
                Category category = categoryRepository.findByName(createProductRequest.getCategoryName());

                Product productEntity = new Product();
                productEntity.setProductName(createProductRequest.getProductName());
                productEntity.setPrice(createProductRequest.getPrice());
                productEntity.setDiscount(createProductRequest.getDiscount());
                productEntity.setSize(createProductRequest.getSize());
                productEntity.setDescription(createProductRequest.getDescription());
                productEntity.setQuantity(createProductRequest.getQuantity());
                productEntity.setCategoryId(category);
                productRepository.save(productEntity);
                return true;
            }
        } catch (Exception e) {
            return false;
        }
        return false;
    }

    @Override
    public boolean deleteProduct(long id) {
        try {
            productRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }


}
