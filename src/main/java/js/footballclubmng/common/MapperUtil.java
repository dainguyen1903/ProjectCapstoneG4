package js.footballclubmng.common;

import js.footballclubmng.entity.*;
import js.footballclubmng.model.dto.*;
import js.footballclubmng.model.response.ListCartItemsResponse;
import js.footballclubmng.model.response.ListCartTicketItemResponse;
import js.footballclubmng.repository.ImagesProductRepository;
import js.footballclubmng.repository.ProductSizeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
@Component
public class MapperUtil {
    private static ImagesProductRepository imagesProductRepository;
    private static ProductSizeRepository productSizeRepository;

    @Autowired
    public MapperUtil(ImagesProductRepository imagesProductRepository, ProductSizeRepository productSizeRepository) {
        this.imagesProductRepository = imagesProductRepository;
        this.productSizeRepository = productSizeRepository;
    }


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
                imagesProductDto.setPlayerName(imagesProduct.getPlayer().getName());
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

    public static ListCartItemsResponse mapToListCartItemsResponses(CartItem cartItem) {

            ListCartItemsResponse listCartItemsResponse = new ListCartItemsResponse();
            listCartItemsResponse.setCartItemId(cartItem.getId());
            Long id = cartItem.getProduct().getId();
            List<ImagesProduct> imagesProductList = imagesProductRepository.findAllByProductId(id);
            List<ProductSize> productSizeList = productSizeRepository.findAllByProductId(id);
            ProductDetailsDto productDetailsDto = mapToProductDetailsDto(cartItem.getProduct(), imagesProductList, productSizeList);
            listCartItemsResponse.setProduct(productDetailsDto);
            listCartItemsResponse.setQuantity(cartItem.getQuantity());
            listCartItemsResponse.setSize(cartItem.getSize());
            listCartItemsResponse.setPlayerName(cartItem.getPlayerName());
            listCartItemsResponse.setPlayerNumber(cartItem.getPlayerNumber());

            return listCartItemsResponse;

    }

    public static ListCartTicketItemResponse mapToListCartTicketItemsResponses(CartTicketItem cartTicketItem) {
        ListCartTicketItemResponse listCartTicketItemResponse = new ListCartTicketItemResponse();
        listCartTicketItemResponse.setCartTicketItemId(cartTicketItem.getId());
        listCartTicketItemResponse.setQuantity(cartTicketItem.getQuantity());
        listCartTicketItemResponse.setFixtures(mapToFixturesDto(cartTicketItem.getFixtures()));
        return listCartTicketItemResponse;
    }

    private static FixturesDto mapToFixturesDto(Fixtures fixtures) {
        FixturesDto fixturesDto = new FixturesDto();
        fixturesDto.setId(fixtures.getId());
        fixturesDto.setName(fixtures.getName());
        fixturesDto.setRound(fixtures.getRound());
        fixturesDto.setHomeTeam(fixtures.getHomeTeam());
        fixturesDto.setAwayTeam(fixtures.getAwayTeam());
        fixturesDto.setDateTime(fixtures.getDateTime());
        fixturesDto.setLocation(fixtures.getLocation());
        fixturesDto.setStatusMatch(fixtures.getStatusMatch());
        fixturesDto.setHomeScore(fixtures.getHomeScore());
        fixturesDto.setAwayScore(fixtures.getAwayScore());
        fixturesDto.setNumberOfTicket(fixtures.getNumberOfTicket());
        fixturesDto.setPriceOfTicket(fixtures.getPriceOfTicket());
        fixturesDto.setNumberOfTicketsSold(fixtures.getNumberOfTicketsSold());
        fixturesDto.setStatus(fixtures.getStatus());
        return fixturesDto;
    }

}

