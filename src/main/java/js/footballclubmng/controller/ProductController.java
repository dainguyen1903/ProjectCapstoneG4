package js.footballclubmng.controller;

import js.footballclubmng.common.CommonConstant;
import js.footballclubmng.entity.ImagesProduct;
import js.footballclubmng.entity.Product;
import js.footballclubmng.model.dto.ProductDetailsDto;
import js.footballclubmng.model.dto.ProductDto;
import js.footballclubmng.model.request.CreateProductRequest;
import js.footballclubmng.model.response.ResponseAPI;
import js.footballclubmng.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class ProductController {

    @Autowired
    ProductService productService;

    @GetMapping(CommonConstant.PRODUCT_API.LIST_PRODUCT)
    public ResponseAPI<List<ProductDto>> listProduct() {
        List<ProductDto> list = productService.getAllProduct();
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, null, list);
    }

    @PostMapping(CommonConstant.PRODUCT_API.CREATE_PRODUCT)
    @PreAuthorize("hasRole('ROLE_Sale')")
    public ResponseAPI<Product> createProduct(@RequestBody CreateProductRequest request) {
        Product createProduct = productService.createProduct(request);
        if(createProduct == null) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.CREATE_PRODUCT_FAIL);
        }
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, CommonConstant.COMMON_MESSAGE.CREATE_PRODUCT_SUCCESS);
    }

    @PutMapping(CommonConstant.PRODUCT_API.UPDATE_PRODUCT)
    public ResponseAPI<Object> updateProduct(@PathVariable int id, @RequestBody @Valid CreateProductRequest createProductRequest) {
        Product product = productService.getProductById(id);
        if(product==null) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.EMPTY, CommonConstant.COMMON_MESSAGE.NOT_FOUND_PRODUCT);
        }
        boolean check = productService.updateProduct(id, createProductRequest);
        if(!check) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST,CommonConstant.COMMON_MESSAGE.UPDATE_PRODUCT_FAIL);
        }
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK,CommonConstant.COMMON_MESSAGE.UPDATE_PRODUCT_SUCCESS);

    }

    @DeleteMapping(CommonConstant.PRODUCT_API.DELETE_PRODUCT)
    @PreAuthorize("hasRole('ROLE_Sale')")
    public ResponseAPI<Object> deleteProduct(@PathVariable int id) {
        Product productEntity = productService.getProductById(id);
        if (productEntity == null) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.EMPTY, CommonConstant.COMMON_MESSAGE.NOT_FOUND_PRODUCT);
        }
        boolean check = productService.deleteProduct(id);
        if (!check) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.DELETE_PRODUCT_FAIL);
        }
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, CommonConstant.COMMON_MESSAGE.DELETE_PRODUCT_SUCCESS);
    }

    @GetMapping(CommonConstant.PRODUCT_API.DETAILS_PRODUCT)
    public ResponseAPI<Object> productDetail(@PathVariable Long id) {
        ProductDetailsDto productDetails = productService.getProductDetailsById(id);
        if (productDetails == null) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.EMPTY, CommonConstant.COMMON_MESSAGE.NOT_FOUND_PRODUCT);
        }
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, null, productDetails);
    }

    @GetMapping(CommonConstant.PRODUCT_API.SEARCH_PRODUCT)
    public ResponseAPI<List<ProductDto>> searchProduct(@RequestParam("productName") String productName) {
        List<ProductDto> productList = productService.searchProduct(productName);
        if(productList.isEmpty()) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.EMPTY, CommonConstant.COMMON_MESSAGE.NOT_FOUND_PRODUCT);
        }
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, null, productList);
    }

    @GetMapping(CommonConstant.PRODUCT_API.GET_IMAGE_PRODUCT_BY_PLAYER)
    public ResponseAPI<List<String>> getImagesByProductIdAndPlayerId(@PathVariable Long productId, @PathVariable Long playerId) {
        List<String> images = productService.getImagesByProductIdAndPlayerId(productId, playerId);
        if (images.isEmpty()) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.EMPTY, CommonConstant.COMMON_MESSAGE.NOT_FOUND_PRODUCT);
        }
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, null, images);
    }


}
