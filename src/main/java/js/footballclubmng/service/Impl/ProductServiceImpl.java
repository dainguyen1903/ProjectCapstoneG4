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
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;


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
    
    public String getImageProductByPlayer(Long productId, Long playerNumber) {
        Product product = productRepository.findById(productId).orElse(null);
        Player player = playerRepository.findByPlayerNumber(playerNumber);
        String image = null;
        if(product != null && player != null && product.getCategoryId() == 1) {
            image = player.getImageFirstJersey();
        }
        if(product != null && player != null && product.getCategoryId() == 6) {
            image = player.getImageSecondJersey();
        }
        return image;
    }

    @Override
    public Product getProductById(Long id) {
        Product product = productRepository.findById(id).orElse(null);
        return product;
    }

    @Override
    public Product createProduct(CreateProductRequest request) {
        try {
            Product product = new Product();
            BeanUtils.copyProperties(request, product);
            product.setStatus(true);
            // Lưu sản phẩm vào cơ sở dữ liệu
            Product savedProduct = productRepository.save(product);
            Long productId = savedProduct.getId();
            // Lưu danh sách hình ảnh sản phẩm vào cơ sở dữ liệu
            saveImagesProduct(productId, request.getImagesProductList());

            // Lưu danh sách kích thước sản phẩm vào cơ sở dữ liệu
            saveProductSize(productId, request.getProductSizeList());

            return savedProduct;
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public boolean updateProduct(Long id, CreateProductRequest request) {
        try {
            Product existingProduct = productRepository.findById(id).orElse(null);
            BeanUtils.copyProperties(request, existingProduct);
            productRepository.save(existingProduct);

            // Xử lý danh sách hình ảnh
            updateProductImages(existingProduct, request.getImagesProductList());

            // Xử lý danh sách kích thước
            updateProductSizes(existingProduct, request.getProductSizeList());

            return true;
        } catch (Exception e) {
            return false;
        }
    }

    private void updateProductSizes(Product existingProduct, List<ProductSizeDto> productSizeList) {

        List<ProductSize> existingSizes = productSizeRepository.findAllByProductId((existingProduct.getId()));

        if(!CollectionUtils.isEmpty(existingSizes)) {
            existingSizes.forEach(e -> {
                e.setProductId(null);
            });
            productSizeRepository.deleteAll(existingSizes);
            productSizeRepository.saveAll(existingSizes);

        }
        saveProductSize(existingProduct.getId(), productSizeList);
    }

    private void saveProductSize(Long productId, List<ProductSizeDto> sizesDtos) {
        if (!CollectionUtils.isEmpty(sizesDtos)) {
            List<ProductSize> saveSizes = new ArrayList<>();
            sizesDtos.forEach(i -> {
                ProductSize sizes = new ProductSize();
                sizes.setProductId(productId);
                sizes.setSize(i.getSize());
                sizes.setQuantity(i.getQuantity());
                saveSizes.add(sizes);
            });
            productSizeRepository.saveAll(saveSizes);
        }
    }

    private void updateProductImages(Product existingProduct, List<ImagesProductDto> imagesProductList) {

        List<ImagesProduct> existingImages = imagesProductRepository.findAllByProductId(existingProduct.getId());
        if (!CollectionUtils.isEmpty(existingImages)) {
            existingImages.forEach(e -> {
                e.setProductId(null);
            });
            imagesProductRepository.saveAll(existingImages);
            imagesProductRepository.deleteAll(existingImages);
        }

        saveImagesProduct(existingProduct.getId(), imagesProductList);
    }


    private void saveImagesProduct(Long productId, List<ImagesProductDto> imgDtos) {
        if (!CollectionUtils.isEmpty(imgDtos)) {
            List<ImagesProduct> saveImgs = new ArrayList<>();
            imgDtos.forEach(i -> {
                ImagesProduct img = new ImagesProduct();
                img.setProductId(productId);
                img.setPath(i.getPath());
                saveImgs.add(img);
            });
            imagesProductRepository.saveAll(saveImgs);
        }
    }


    @Override
    public boolean deleteProduct(Long id) {
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

//    public List<String> getImagesByProductIdAndPlayerId(Long productId, Long playerId) {
//        return imagesProductRepository.findAllByProductIdAndPlayerId(productId, playerId);
//    }


}
