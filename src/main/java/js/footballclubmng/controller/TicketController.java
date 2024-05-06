package js.footballclubmng.controller;

import js.footballclubmng.common.CommonConstant;
import js.footballclubmng.model.response.ResponseAPI;
import js.footballclubmng.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class TicketController {
    @Autowired
    private TicketService ticketService;

//    @PostMapping(CommonConstant.TICKET_API.ADD_ORDER_TICKET)
//    public ResponseAPI<Object> addOrderTicket(@RequestHeader(name = "Authorization",required = false) String token, @RequestParam Float totalPrice) {
//        if (token == null) {
//            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.EMPTY_TOKEN);
//        }
//        if (totalPrice == null) {
//            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.EMPTY_TOTAL_PRICE);
//        }
//        boolean result = ticketService.addOrderTicket(token, totalPrice);
//        if (!result) {
//            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, CommonConstant.COMMON_MESSAGE.ADD_TICKET_FAIL);
//        }
//        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, CommonConstant.COMMON_MESSAGE.ADD_TICKET_SUCCESS);
//    }

}
