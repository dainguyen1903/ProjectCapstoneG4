package js.footballclubmng.service.Impl;

import js.footballclubmng.entity.Product;
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

    public List<Product> getAllProduct() {
        List<Product> list;
        list = productRepository.findAll();
        return list;
    }


}
