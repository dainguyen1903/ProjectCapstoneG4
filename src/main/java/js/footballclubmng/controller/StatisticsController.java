package js.footballclubmng.controller;

import js.footballclubmng.common.CommonConstant;
import js.footballclubmng.model.dto.ProductDto;
import js.footballclubmng.model.response.CalculateRevenueResponse;
import js.footballclubmng.model.response.QuantityBuyerResponse;
import js.footballclubmng.model.response.QuantityProductSalesResponse;
import js.footballclubmng.model.response.ResponseAPI;
import js.footballclubmng.service.StatisticService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class StatisticsController {
    @Autowired
    StatisticService statisticService;

    @GetMapping(CommonConstant.STATISTICS_API.STATISTIC_QUANTITY_PRODUCT_SALES)
    @PreAuthorize("hasRole('ROLE_Sale') or hasRole('ROLE_Admin')")
    public ResponseAPI<QuantityProductSalesResponse> countSoldProductsByMonthAndYear(@RequestParam int year, @RequestParam int month) {
        try {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, CommonConstant.COMMON_MESSAGE.STATISTIC_QUANTITY_PRODUCT_SALE,
                    statisticService.countSoldProductByMonthAndYear(year, month));
        } catch (Exception e) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, e.getMessage());
        }

    }

    @GetMapping(CommonConstant.STATISTICS_API.STATISTIC_QUANTITY_BUYER)
    @PreAuthorize("hasRole('ROLE_Sale') or hasRole('ROLE_Admin')")
    public ResponseAPI<QuantityBuyerResponse> countBuyerByMonthAndYear(@RequestParam int year, @RequestParam int month) {
        try {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, CommonConstant.COMMON_MESSAGE.STATISTIC_QUANTITY_BUYER,
                    statisticService.countBuyerByMonthAndYear(year, month));
        } catch (Exception e) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, e.getMessage());
        }
    }

    @GetMapping(CommonConstant.STATISTICS_API.STATISTIC_REVENUE)
    @PreAuthorize("hasRole('ROLE_Sale') or hasRole('ROLE_Admin')")
    public ResponseAPI<CalculateRevenueResponse> calculateRevenue(@RequestParam int year, @RequestParam int month) {
        try {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, CommonConstant.COMMON_MESSAGE.STATISTIC_REVENUE,
                    statisticService.calculateRevenue(year, month));
        } catch (Exception e) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, e.getMessage());
        }
    }


    @GetMapping(CommonConstant.STATISTICS_API.STATISTIC_TOP_5_PRODUCT_SALES)
    @PreAuthorize("hasRole('ROLE_Sale') or hasRole('ROLE_Admin')")
    public ResponseAPI<List<ProductDto>> listTop5ProductSaleas() {
        List<ProductDto> listTop5ProductSales = statisticService.getTop5ProductSales();
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, CommonConstant.COMMON_MESSAGE.STATISTIC_TOP_5_PRODUCT_SALES, listTop5ProductSales);
    }


}

