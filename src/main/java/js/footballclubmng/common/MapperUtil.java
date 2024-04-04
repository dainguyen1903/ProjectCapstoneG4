package js.footballclubmng.common;

import js.footballclubmng.entity.Category;
import js.footballclubmng.entity.ImagesProduct;
import js.footballclubmng.entity.Product;
import js.footballclubmng.entity.ProductSize;
import js.footballclubmng.model.dto.*;

import java.util.ArrayList;
import java.util.List;

public class MapperUtil {

    public static ProductDto mapToProductDto(Product product) {
        ProductDto productDto = new ProductDto();

        productDto.setId(product.getId());
        productDto.setProductName(product.getProductName());
        productDto.setPrice(product.getPrice());
        productDto.setDiscount(product.getDiscount());
        productDto.setDescription(product.getDescription());
        productDto.setStatus(product.getStatus());
        productDto.setIsCustomise(product.getIsCustomise());

        if (product.getCategory() != null) {
            productDto.setCategory(mapToCategoryDto(product.getCategory()));
        }

        return productDto;
    }

    public static CategoryDto mapToCategoryDto(Category category) {
        CategoryDto categoryDto = new CategoryDto();

        categoryDto.setId(category.getId());
        categoryDto.setName(category.getName());


        return categoryDto;
    }

    public static ProductDetailsDto mapToProductDetailsDto(Product product, List<ImagesProduct> imagesProductList, List<ProductSize> productSizeList) {
        ProductDetailsDto productDetailsDto = new ProductDetailsDto();

        productDetailsDto.setId(product.getId());
        productDetailsDto.setProductName(product.getProductName());
        productDetailsDto.setPrice(product.getPrice());
        productDetailsDto.setDiscount(product.getDiscount());
        productDetailsDto.setDescription(product.getDescription());
        productDetailsDto.setStatus(product.getStatus());
        productDetailsDto.setIsCustomise(product.getIsCustomise());
        productDetailsDto.setCategory(mapToCategoryDto(product.getCategory()));

        List<ImagesProductDto> imagesProductDtoList = mapToImagesProductDtoList(imagesProductList);
        productDetailsDto.setImagesProductDtoList(imagesProductDtoList);

        List<ProductSizeDto> productSizeDtoList = mapToProductSizeDtoList(productSizeList);
        productDetailsDto.setProductSizeDtoList(productSizeDtoList);

        return productDetailsDto;
    }


    public static List<ImagesProductDto> mapToImagesProductDtoList(List<ImagesProduct> imagesProductList) {
        List<ImagesProductDto> imagesProductDtoList = new ArrayList<>();

        for (ImagesProduct imagesProduct : imagesProductList) {
            ImagesProductDto imagesProductDto = new ImagesProductDto();
            imagesProductDto.setPath(imagesProduct.getPath());
            if (imagesProduct.getPlayer() != null) {
                imagesProductDto.setPlayerId(imagesProduct.getPlayer().getId());
            }
            imagesProductDtoList.add(imagesProductDto);
        }

        return imagesProductDtoList;
    }

    public static List<ProductSizeDto> mapToProductSizeDtoList(List<ProductSize> productSizeList) {
        List<ProductSizeDto> productSizeDtoList = new ArrayList<>();

        for (ProductSize productSize : productSizeList) {
            ProductSizeDto productSizeDto = new ProductSizeDto();
            productSizeDto.setSize(productSize.getSize());
            productSizeDto.setQuantity(productSize.getQuantity());
            productSizeDtoList.add(productSizeDto);
        }

        return productSizeDtoList;
    }

}

