package js.footballclubmng.service.Impl;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import js.footballclubmng.common.MapperUtil;
import js.footballclubmng.entity.*;
import js.footballclubmng.model.dto.*;
import js.footballclubmng.model.request.CreateProductRequest;
import js.footballclubmng.model.response.ListPlayerResponse;
import js.footballclubmng.repository.CategoryRepository;
import js.footballclubmng.repository.ImagesProductRepository;
import js.footballclubmng.repository.ProductRepository;
import js.footballclubmng.repository.ProductSizeRepository;
import js.footballclubmng.service.ProductService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ImagesProductRepository imagesProductRepository;

    @Autowired
    private ProductSizeRepository productSizeRepository;


    public List<ProductDto> getAllProduct() {

        List<Product> listProduct = productRepository.findAll();

        return listProduct.stream()
                .map(MapperUtil::mapToProductDto)
                .collect(Collectors.toList());
    }

    @Override
    public ProductDetailsDto getProductDetailsById(Long id) {
        Product product = productRepository.findById(id).orElse(null);
        if (product != null) {
            List<ImagesProduct> imagesProductList = imagesProductRepository.findAllByProductId(id);
            List<ProductSize> productSizeList = productSizeRepository.findAllByProductId(id);
            product.setImagesProduct(imagesProductList);
            product.setProductSizes(productSizeList);

            return MapperUtil.mapToProductDetailsDto(product, imagesProductList, productSizeList);

        }

        return null;
    }

    @Override
    public Product getProductById(long id) {
        Product product = productRepository.findById(id).orElse(null);
        return product;
    }

    @Override
    public Product createProduct(CreateProductRequest request) {
        try {


            Product product = new Product();
            product.setProductName(request.getProductName());
            product.setPrice(request.getPrice());
            product.setDiscount(request.getDiscount());
            product.setDescription(request.getDescription());
            product.setStatus(true);

            // Kiểm tra và lấy danh mục từ cơ sở dữ liệu hoặc tạo mới nếu chưa tồn tại
            Category category = categoryRepository.findByName(request.getCategoryName());
            if (category == null) {
                category = new Category();
                category.setName(request.getCategoryName());
                category = categoryRepository.save(category);
            }
            product.setCategory(category);

            // Lưu sản phẩm vào cơ sở dữ liệu
            Product savedProduct = productRepository.save(product);

            // Lưu danh sách hình ảnh sản phẩm vào cơ sở dữ liệu
            if (request.getImagesProductList() != null) {
                for (ImagesProduct imagesProduct : request.getImagesProductList()) {
                    imagesProduct.setProduct(savedProduct);
                    imagesProductRepository.save(imagesProduct);
                }
            }

            // Lưu danh sách kích thước sản phẩm vào cơ sở dữ liệu
            if (request.getProductSizeList() != null) {
                for (ProductSize productSize : request.getProductSizeList()) {
                    productSize.setProduct(savedProduct);
                    productSizeRepository.save(productSize);
                }
            }

            return savedProduct;
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public boolean updateProduct(long id, CreateProductRequest request) {
        try {
            Product existingProduct = productRepository.findById(id).orElse(null);

            //Cập nhật thông tin của sản phẩm
            existingProduct.setProductName(request.getProductName());
            existingProduct.setPrice(request.getPrice());
            existingProduct.setDiscount(request.getDiscount());
            existingProduct.setDescription(request.getDescription());

            // Kiểm tra và lấy danh mục từ cơ sở dữ liệu hoặc tạo mới nếu chưa tồn tại
            Category category = categoryRepository.findByName(request.getCategoryName());
            if (category == null) {
                category = new Category();
                category.setName(request.getCategoryName());
                category = categoryRepository.save(category);
            }
            existingProduct.setCategory(category);

            Product updatedProduct = productRepository.save(existingProduct);

            // Cập nhật danh sách hình ảnh sản phẩm
            if (request.getImagesProductList() != null) {
                for (ImagesProduct imagesProduct : request.getImagesProductList()) {
                    imagesProduct.setProduct(updatedProduct); // Đặt sản phẩm cho hình ảnh
                    imagesProductRepository.save(imagesProduct); // Lưu hình ảnh vào cơ sở dữ liệu
                }
            }

            // Cập nhật danh sách kích thước sản phẩm
            if (request.getProductSizeList() != null) {
                for (ProductSize productSize : request.getProductSizeList()) {
                    productSize.setProduct(updatedProduct);
                    productSizeRepository.save(productSize);
                }
            }

            return true;

        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean deleteProduct(long id) {
        try {
            Product products = productRepository.findById(id).orElse(null);
            products.setStatus(false);
            productRepository.save(products);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public List<ProductDto> searchProduct(String productName) {
        List<Product> listProduct = productRepository.searchProductByName(productName);
        return listProduct.stream()
                .map(MapperUtil::mapToProductDto)
                .collect(Collectors.toList());
    }

    public List<String> getImagesByProductIdAndPlayerId(Long productId, Long playerId) {
        return imagesProductRepository.findAllByProductIdAndPlayerId(productId, playerId);
    }


}
