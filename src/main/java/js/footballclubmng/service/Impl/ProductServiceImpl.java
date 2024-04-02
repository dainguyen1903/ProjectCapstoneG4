package js.footballclubmng.service.Impl;

import js.footballclubmng.entity.*;
import js.footballclubmng.model.dto.CategoryDto;
import js.footballclubmng.model.dto.ImagesProductDto;
import js.footballclubmng.model.dto.ProductDto;
import js.footballclubmng.model.dto.ProductSizeDto;
import js.footballclubmng.model.request.CreateProductRequest;
import js.footballclubmng.model.response.ListPlayerResponse;
import js.footballclubmng.repository.CategoryRepository;
import js.footballclubmng.repository.ImagesProductRepository;
import js.footballclubmng.repository.ProductRepository;
import js.footballclubmng.service.ProductService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

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
    private ModelMapper mapper;

    @Transactional
    public List<ProductDto> getAllProduct() {
//        List<Product> productList = productRepository.findAll();
//        if (!CollectionUtils.isEmpty(productList)) {
//            List<ProductDto> listProduct = productList.stream().map(product -> {
//                List<ImagesProduct> imgs = product.getImagesProduct();
//
//                Category category = product.getCategory(); // Lấy category từ Product
//                CategoryDto categoryDto = null;
//                if (category != null) {
//                    categoryDto = CategoryDto.builder()
//                            .name(category.getName())
//                            // Thêm các trường khác của CategoryDto nếu cần
//                            .build();
//                }
//
//                ProductDto resp = ProductDto.builder()
//                        .productName(product.getProductName())
//                        .price(product.getPrice())
//                        .description(product.getDescription())
//                        .category(categoryDto) // Đặt categoryDto vào ProductDto
//                        .build();
//
//                List<ProductSizeDto> productSizeList = product.getProductSizes().stream()
//                        .map(productSize -> ProductSizeDto.builder()
//                                .size(productSize.getSize())
//                                // Thêm các trường khác của ProductSizeDto nếu cần
//                                .build())
//                        .collect(Collectors.toList());
//
//                if (!CollectionUtils.isEmpty(imgs)) {
//                    resp.setImagesProductList(imgs.stream()
//                            .map(img -> ImagesProductDto.builder()
//                                    .path(img.getPath())
//                                    .id(img.getId())
//                                    .build())
//                            .collect(Collectors.toList()));
//                }
//                return resp;
//            }).collect(Collectors.toList());
//            return listProduct;
//        }
//        return new ArrayList<>();
        List<Product> listProduct = productRepository.getAllProduct();

//        return listProduct.stream()
//                .map(product -> mapper.map(product, ProductDto.class))
//
//                .collect(Collectors.toList());
        return listProduct.stream().map((product) -> mapToProductDto(product)).collect(Collectors.toList());

    }

    private ProductDto mapToProductDto(Product product) {
        ProductDto listProductResponse = new ProductDto();

        listProductResponse.setId(product.getId());
        listProductResponse.setProductName(product.getProductName());
        listProductResponse.setPrice(product.getPrice());
        listProductResponse.setDiscount(product.getDiscount());
        listProductResponse.setDescription(product.getDescription());
        listProductResponse.setStatus(product.getStatus());
        listProductResponse.setIsCustomise(product.getIsCustomise());
        listProductResponse.setCategory(product.getCategory());

        List<String> imageUrls = new ArrayList<>();
        for (ImagesProduct image : product.getImagesProduct()) {
            imageUrls.add(image.getPath());
        }
        listProductResponse.setImagesProductList(imageUrls);


        return listProductResponse;
    }





    @Override
    public Product getProductById(long id) {
        Product product = productRepository.findById(id).orElse(null);
        return product;
    }

    @Override
    public boolean createProduct(CreateProductRequest createProductRequest) {
//        try {
//            Category category = categoryRepository.findByName(createProductRequest.getCategoryName());
//            Product productEntity = new Product();
//
//        } catch (Exception e) {
//            return false;
//        }
        return false;
    }

    @Override
    public boolean updateProduct(long id, CreateProductRequest createProductRequest) {
//        try {
//            Product product = productRepository.findById(id).orElse(null);
//            if (product != null) {
//                Category category = categoryRepository.findByName(createProductRequest.getCategoryName());
//                product.setProductName(createProductRequest.getProductName());
//                product.setPrice(createProductRequest.getPrice());
//                product.setDiscount(createProductRequest.getDiscount());
//                product.setDescription(createProductRequest.getDescription());
//                product.setCategoryId(category);
//                product.setIsCustomise(createProductRequest.getIsCustomise());
//                productRepository.save(product);
//                if(createProductRequest.getImagesProductList() != null) {
//                    for(String image : createProductRequest.getImagesProductList()) {
//                        ImagesProductDto imagesProduct = new ImagesProductDto();
//                        imagesProduct.setPath(image);
//                        imagesProduct.setProduct(product);
//                        imagesProductRepository.save(imagesProduct);
//                    }
//                }
//                return true;
//            }
//        } catch (Exception e) {
//            return false;
//        }
        return false;
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

    public List<Product> searchProduct(String search) {
        return productRepository.searchProductByName(search);
    }


}
