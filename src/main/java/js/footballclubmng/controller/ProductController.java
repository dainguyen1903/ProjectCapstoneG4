package js.footballclubmng.controller;

import js.footballclubmng.common.CommonConstant;
import js.footballclubmng.entity.Product;
import js.footballclubmng.model.response.ResponseAPI;
import js.footballclubmng.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ProductController {

    @Autowired
    ProductService productService;

    @GetMapping(CommonConstant.PRODUCT_API.LIST_PRODUCT)
    @PreAuthorize("hasRole('ROLE_Sale')")
    public ResponseAPI<List<Product>> listProduct() {
        List<Product> list = productService.getAllProduct();
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, null, list);
    }

}
