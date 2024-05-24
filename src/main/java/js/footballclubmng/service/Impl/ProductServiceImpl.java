package js.footballclubmng.service.Impl;

import js.footballclubmng.util.MapperUtil;
import js.footballclubmng.entity.*;
import js.footballclubmng.model.dto.*;
import js.footballclubmng.model.request.CreateProductRequest;
import js.footballclubmng.repository.*;
import js.footballclubmng.service.ProductService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.text.Normalizer;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.regex.Pattern;
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
        if (product != null && player != null && product.getCategoryId() == 1) {
            image = player.getImageFirstJersey();
        }
        if (product != null && player != null && product.getCategoryId() == 6) {
            image = player.getImageSecondJersey();
        }
        return image;
    }

    private static String removeDiacritics(String str) {
        return Normalizer.normalize(str, Normalizer.Form.NFD)
                .replaceAll("\\p{M}", "");
    }

    @Override
    public List<ProductDto> getFilterProducts(String categoryName, String keyword, Float minPrice, Float maxPrice, String sortType) {
        List<Product> listProducts;
        //Lọc sản phẩm theo tên danh mục
        if (categoryName != null && !categoryName.isEmpty()) {
            listProducts = productRepository.filterProductByCategoryName(categoryName);
        } else {
            listProducts = productRepository.findAll();
        }

        //Search
        if (keyword != null && !keyword.isEmpty()) {
            String lower =  removeDiacritics(keyword).toLowerCase();
            listProducts = listProducts.stream()
                    .filter(product -> removeDiacritics(product.getProductName()).toLowerCase().contains(lower))
                    .collect(Collectors.toList());
        }

        if (minPrice != null && maxPrice != null) {
            listProducts = listProducts.stream()
                    .filter(product -> product.getPrice() >= minPrice && product.getPrice() <= maxPrice)
                    .collect(Collectors.toList());
        } else if (minPrice != null) {
            listProducts = listProducts.stream()
                    .filter(product -> product.getPrice() >= minPrice)
                    .collect(Collectors.toList());
        } else if (maxPrice != null) {
            listProducts = listProducts.stream()
                    .filter(product -> product.getPrice() <= maxPrice)
                    .collect(Collectors.toList());
        }
        //Sắp xếp
        if (sortType != null && !sortType.isEmpty()) {
            if (sortType.equals("Tăng dần")) {
                listProducts.sort(Comparator.comparing(Product::getPrice));
            } else if (sortType.equals("Giảm dần")) {
                listProducts.sort(Comparator.comparing(Product::getPrice).reversed());
            }
        }
        return listProducts.stream()
                .map(MapperUtil::mapToProductDto)
                .collect(Collectors.toList());
    }

//    public static String removeDiacritics(String str) {
//        String nfdNormalizedString = Normalizer.normalize(str, Normalizer.Form.NFD);
//        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
//        return pattern.matcher(nfdNormalizedString).replaceAll("");
//    }

    @Override
    public Product getProductById(Long id) {
        Product product = productRepository.findById(id).orElse(null);
        return product;
    }

    @Override
    public Product createProduct(CreateProductRequest request) {
        try {
            Product product = new Product();
            product.setProductName(request.getProductName());
            product.setCategoryId(Long.valueOf(request.getCategoryId()));
            product.setPrice(Float.parseFloat(request.getPrice()));
            product.setDiscount(Float.parseFloat(request.getDiscount()));
            product.setIsCustomise(request.getIsCustomise());
            product.setDescription(request.getDescription());
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
            existingProduct.setProductName(request.getProductName());
            existingProduct.setCategoryId(Long.valueOf(request.getCategoryId()));
            existingProduct.setPrice(Float.parseFloat(request.getPrice()));
            existingProduct.setDiscount(Float.parseFloat(request.getDiscount()));
            existingProduct.setIsCustomise(request.getIsCustomise());
            existingProduct.setDescription(request.getDescription());
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

        if (!CollectionUtils.isEmpty(existingSizes)) {
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
                sizes.setQuantity(Integer.parseInt(i.getQuantity()));
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
