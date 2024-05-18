package js.footballclubmng.service.Impl;

import js.footballclubmng.entity.Product;
import js.footballclubmng.util.MapperUtil;
import js.footballclubmng.model.dto.ProductDto;
import js.footballclubmng.model.response.CalculateRevenueResponse;
import js.footballclubmng.model.response.QuantityBuyerResponse;
import js.footballclubmng.model.response.QuantityProductSalesResponse;
import js.footballclubmng.repository.OrderRepository;
import js.footballclubmng.repository.ProductRepository;
import js.footballclubmng.service.StatisticService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.Tuple;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.time.YearMonth;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StatisticServiceImpl implements StatisticService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderRepository orderRepository;


    @Override
    public List<ProductDto> getTop5ProductSales() {
        List<Product> listTop5ProductSale = productRepository.listTop5ProductSales();
        return listTop5ProductSale.stream()
                .map(MapperUtil::mapToProductDto)
                .collect(Collectors.toList());
    }

    @Override
    public QuantityProductSalesResponse countSoldProductByMonthAndYear(int year, int month) {
        if (year > YearMonth.now().getYear()) {
            throw new RuntimeException("Năm cần nhỏ hơn hoặc bằng với năm ở hiện tại là " + YearMonth.now().getYear());
        }
        if (month < 1 || month > 12) {
            throw new RuntimeException("Tháng cần nằm trong khoảng từ 1 đến 12");
        }
        Tuple quantityProductSales = orderRepository.countProductSalesByMonthAndYear(year, month);

        if (quantityProductSales != null) {
            QuantityProductSalesResponse resp = new QuantityProductSalesResponse();
            resp.setYear(quantityProductSales.get(0, BigInteger.class).intValue());
            resp.setMonth(quantityProductSales.get(1, BigInteger.class).intValue());
            resp.setSum(quantityProductSales.get(2, BigDecimal.class).intValue());
            return resp;
        } else {
            throw new RuntimeException("Không có thống kê số lượng sản phẩm trong thời gian này");
        }
    }

    @Override
    public QuantityBuyerResponse countBuyerByMonthAndYear(int year, int month) {
        if (year > YearMonth.now().getYear()) {
            throw new RuntimeException("Năm cần nhỏ hơn hoặc bằng với năm ở hiện tại là " + YearMonth.now().getYear());
        }
        if (month < 1 || month > 12) {
            throw new RuntimeException("Tháng cần nằm trong khoảng từ 1 đến 12");
        }
        Tuple quantityBuyer = orderRepository.countBuyerByMonthAndYear(year, month);
        if(quantityBuyer != null) {
            QuantityBuyerResponse resp = new QuantityBuyerResponse();
            resp.setYear(quantityBuyer.get(0, BigInteger.class).intValue());
            resp.setMonth(quantityBuyer.get(1, BigInteger.class).intValue());
            resp.setSum(quantityBuyer.get(2, BigInteger.class).intValue());
            return resp;
        } else {
            throw new RuntimeException("Không có thống kê số lượng người mua trong thời gian này");
        }
    }

    @Override
    public CalculateRevenueResponse calculateRevenue(int year, int month) {
        if (year > YearMonth.now().getYear()) {
            throw new RuntimeException("Năm cần nhỏ hơn hoặc bằng với năm ở hiện tại là " + YearMonth.now().getYear());
        }
        if (month < 1 || month > 12) {
            throw new RuntimeException("Tháng cần nằm trong khoảng từ 1 đến 12");
        }
        Tuple revenue = orderRepository.calculateRevenue(year, month);
        if(revenue != null) {
            CalculateRevenueResponse resp = new CalculateRevenueResponse();
            resp.setYear(revenue.get(0, BigInteger.class).intValue());
            resp.setMonth(revenue.get(1, BigInteger.class).intValue());
            resp.setSum(revenue.get(2, Double.class).floatValue());
            return resp;
        } else {
            throw new RuntimeException("Không có thống kê doanh thu trong thời gian này");
        }
    }


}
