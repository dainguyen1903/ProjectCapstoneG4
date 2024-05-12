package js.footballclubmng.common;

import js.footballclubmng.entity.*;
import js.footballclubmng.model.dto.*;
import js.footballclubmng.model.response.ListCartItemsResponse;
import js.footballclubmng.model.response.ListCartTicketItemResponse;
import js.footballclubmng.model.response.ListShippingResponse;
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
            listCartItemsResponse.setPlayer(cartItem.getPlayer());

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
        fixturesDto.setImageHomeTeam(fixtures.getImageHomeTeam());
        fixturesDto.setAwayTeam(fixtures.getAwayTeam());
        fixturesDto.setImageAwayTeam(fixtures.getImageAwayTeam());
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

    public static UserDto mapToUserDto(User user) {
        // Chuyển đổi từ User entity sang UserDto
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setEmail(user.getEmail());
        userDto.setFirstName(user.getFirstName());
        userDto.setLastName(user.getLastName());
        return userDto;
    }


    public static OrderDto mapToOrderDto(Order order) {
        OrderDto orderDto = new OrderDto();
        orderDto.setId(order.getId());
        orderDto.setUser(mapToUserDto(order.getUser()));
        orderDto.setTotalPrice(order.getTotalPrice());
        orderDto.setOrderDate(order.getOrderDate());
        orderDto.setShipping(mapToShippingDto(order.getShipping()));
        orderDto.setOrderStatus(order.getStatus());


        return orderDto;
    }

    public static OrderHistoryDto mapToOrderHistoryDto(Order order, List<OrderDetail> orderDetailList) {
        OrderHistoryDto orderHistoryDto = new OrderHistoryDto();
        orderHistoryDto.setOrderCode(order.getOrderCode());
        orderHistoryDto.setTotalPrice(order.getTotalPrice());
        orderHistoryDto.setOrderDate(order.getOrderDate());
        orderHistoryDto.setPaymentMethod(order.getPaymentMethod());
        orderHistoryDto.setOrderStatus(order.getStatus());
        orderHistoryDto.setShipping(mapToShippingDto(order.getShipping()));

        List<OrderDetailDto> orderDetailDtoList = mapToOrderDetailDtoList(orderDetailList);
        orderHistoryDto.setOrderDetailDtoList(orderDetailDtoList);

        return orderHistoryDto;
    }

    public static ShippingDto mapToShippingDto(Shipping shipping) {
        ShippingDto shippingDto = new ShippingDto();
        shippingDto.setName(shipping.getShipName());
        shippingDto.setPhone(shipping.getPhone());
        shippingDto.setAddress(shipping.getAddress());
        shippingDto.setTotalPrice(shipping.getTotalPrice());
        shippingDto.setNote(shipping.getNote());
        shippingDto.setCreateAt(shipping.getCreateAt());
        shippingDto.setUpdatedAt(shipping.getUpdateAt());
        if(shipping.getShipperId() != null) {
            shippingDto.setShipperName(mapToUserDto(shipping.getShipper()));
        }
        shippingDto.setShipStatus(shipping.getStatus());

        return shippingDto;
    }


    public static List<OrderDetailDto> mapToOrderDetailDtoList(List<OrderDetail> orderDetailList) {
        List<OrderDetailDto> orderDetailDtoList = new ArrayList<>();
        for (OrderDetail orderDetail : orderDetailList) {
            OrderDetailDto orderDetailDto = new OrderDetailDto();
            orderDetailDto.setUnitPrice(orderDetail.getUnitPrice());
            orderDetailDto.setSize(orderDetail.getSize());
            orderDetailDto.setQuantity(orderDetail.getQuantity());
            ProductDto productDto = mapToProductDto(orderDetail.getProduct());
            orderDetailDto.setProduct(productDto);
            orderDetailDtoList.add(orderDetailDto);
        }
        return orderDetailDtoList;
    }

    public static ListShippingResponse mapToShippingResponse(Shipping shipping) {
        ListShippingResponse listShippingResponse = new ListShippingResponse();
        listShippingResponse.setId(shipping.getId());
        listShippingResponse.setShipName(shipping.getShipName());
        listShippingResponse.setPhone(shipping.getPhone());
        listShippingResponse.setDistrict(shipping.getDistrict());
        listShippingResponse.setWard(shipping.getWard());
        listShippingResponse.setProvince(shipping.getProvince());
        listShippingResponse.setAddress(shipping.getAddress());
        listShippingResponse.setTotalPrice(shipping.getTotalPrice());
        listShippingResponse.setShippingCost(shipping.getShippingCost());
        listShippingResponse.setDesiredDeliveryTime(shipping.getDesiredDeliveryTime());
        listShippingResponse.setNote(shipping.getNote());
        listShippingResponse.setCreateAt(shipping.getCreateAt());
        listShippingResponse.setUpdateAt(shipping.getUpdateAt());
        listShippingResponse.setStatus(shipping.getStatus());

        if(shipping.getShipper() != null && shipping.getShipper().getAuthority().equals("Shipper")) {
            listShippingResponse.setShipperName(mapToUserDto(shipping.getShipper()));
        }
        return listShippingResponse;
    }




}

