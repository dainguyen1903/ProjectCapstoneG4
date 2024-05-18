package js.footballclubmng.service;

import js.footballclubmng.entity.Product;
import js.footballclubmng.model.dto.ProductDto;
import js.footballclubmng.model.response.CalculateRevenueResponse;
import js.footballclubmng.model.response.QuantityBuyerResponse;
import js.footballclubmng.model.response.QuantityProductSalesResponse;

import java.util.List;

public interface StatisticService {

    List<ProductDto> getTop5ProductSales();

    QuantityProductSalesResponse countSoldProductByMonthAndYear(int year, int month);

    QuantityBuyerResponse countBuyerByMonthAndYear(int year, int month);

    CalculateRevenueResponse calculateRevenue(int year, int month);
}
