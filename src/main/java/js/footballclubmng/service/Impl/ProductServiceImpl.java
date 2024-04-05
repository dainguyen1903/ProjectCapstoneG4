package js.footballclubmng.service.Impl;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import js.footballclubmng.common.MapperUtil;
import js.footballclubmng.entity.*;
import js.footballclubmng.model.dto.*;
import js.footballclubmng.model.request.CreateProductRequest;
import js.footballclubmng.model.response.ListPlayerResponse;
import js.footballclubmng.repository.*;
import js.footballclubmng.service.ProductService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

    @Autowired
    private PlayerRepository playerRepository;


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
            product.setIsCustomise(request.getIsCustomise());
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
            existingProduct.setIsCustomise(request.getIsCustomise());
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

            // Xử lý danh sách hình ảnh
            updateProductImages(existingProduct, request.getImagesProductList());

            // Xử lý danh sách kích thước
            updateProductSizes(existingProduct, request.getProductSizeList());

            return true;

        } catch (Exception e) {
            return false;
        }
    }

    private void updateProductSizes(Product existingProduct, List<ProductSize> productSizeList) {

        List<ProductSize> existingSizes = productSizeRepository.findAllByProductId((existingProduct.getId()));

        List<ProductSize> updateProductSize = new ArrayList<>();
        if(productSizeList != null) {
            for(ProductSize productSize : productSizeList) {
                ProductSize newProductSize = new ProductSize();
                newProductSize.setSize(productSize.getSize());
                newProductSize.setQuantity(productSize.getQuantity());

                productSize.setProduct(existingProduct);
                updateProductSize.add(productSize);
            }
        }
        // Xóa các size, quantity hiện tại không có trong danh sách mới
        List<ProductSize> sizesToDelete = existingSizes.stream()
                .filter(image -> !updateProductSize.contains(image))
                .collect(Collectors.toList());
        productSizeRepository.deleteAll(sizesToDelete);
        // Lưu danh sách size, quantity mới vào cơ sở dữ liệu
        productSizeRepository.saveAll(updateProductSize);

    }

    private void updateProductImages(Product existingProduct, List<ImagesProduct> imagesProductList) {

        List<ImagesProduct> existingImages = imagesProductRepository.findAllByProductId(existingProduct.getId());

        List<ImagesProduct> updateImagesProducts = new ArrayList<>();
        if(imagesProductList != null) {
            for(ImagesProduct imagesProduct : imagesProductList) {
                ImagesProduct newImagesProduct = new ImagesProduct();
                newImagesProduct.setPath(imagesProduct.getPath());

                // Cập nhật playerId cho mỗi ảnh, nếu có
                if (imagesProduct.getPlayer() != null && imagesProduct.getPlayer().getId() != null) {
                    Player player = playerRepository.findById(imagesProduct.getPlayer().getId()).orElse(null);
                    if (player != null) {
                        // Cập nhật playerId cho hình ảnh hiện tại
                        imagesProduct.setPlayer(player);
                    } else {
                        // Nếu không tìm thấy player, đặt playerId thành null
                        imagesProduct.setPlayer(null);
                    }
                }
                newImagesProduct.setProduct(existingProduct);
                updateImagesProducts.add(newImagesProduct);
            }
            // Xóa các hình ảnh hiện tại không có trong danh sách mới
            List<ImagesProduct> imagesToDelete = existingImages.stream()
                    .filter(image -> !updateImagesProducts.contains(image))
                    .collect(Collectors.toList());
            imagesProductRepository.deleteAll(imagesToDelete);
            // Lưu danh sách hình ảnh mới vào cơ sở dữ liệu
            imagesProductRepository.saveAll(updateImagesProducts);

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
