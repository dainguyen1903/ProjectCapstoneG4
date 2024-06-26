package js.footballclubmng.service.Impl;

import js.footballclubmng.model.dto.ShipperDto;
import js.footballclubmng.util.MapperUtil;
import js.footballclubmng.config.TokenProvider;
import js.footballclubmng.entity.Shipping;
import js.footballclubmng.entity.User;
import js.footballclubmng.model.dto.UserDto;
import js.footballclubmng.model.response.ListShippingResponse;
import js.footballclubmng.repository.ShippingRepository;
import js.footballclubmng.repository.UserRepository;
import js.footballclubmng.service.ShipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ShipServiceImpl implements ShipService {
    @Autowired
    private ShippingRepository shippingRepository;

    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
    private UserRepository userRepository;
    @Override
    public List<ListShippingResponse> getAllShipping() {
        List<Shipping> shippingList = shippingRepository.findAll();
        return shippingList.stream()
                .map(MapperUtil::mapToShippingResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void assignToShipper(Long shippingId, Long shipperId) {
        Shipping shipping = shippingRepository.findById(shippingId).orElse(null);
        if(shipping != null) {
            shipping.setShipperId(shipperId);
            shippingRepository.save(shipping);
        }
    }

    public int countOrderByShipper(Long shipperId) {

        return shippingRepository.countByShipperId(shipperId);
    }

    public List<UserDto> getShipperByShippingId(Long shippingId) {
        Shipping shipping = shippingRepository.findById(shippingId).orElse(null);
        if(shipping != null && shipping.getDistrict() != null ) {
            List<User> listShipper = userRepository.findByDistrictAndAuthority(shipping.getDistrict(), "Shipper");
            return listShipper.stream()
                    .filter(user -> user.getDistrict() != null)
                    .map(MapperUtil::mapToUserDto)
                    .collect(Collectors.toList());
        } else {
            throw new RuntimeException("Không có shipper phù hợp cho đơn hàng này");
        }
    }

    public List<ShipperDto> listAllShipper() {
        List<User> listShipper = userRepository.findByAuthority("Shipper");
        if(!listShipper.isEmpty()) {
            return listShipper.stream()
                    .map(MapperUtil::mapToShipperDto)
                    .collect(Collectors.toList());
        } else {
            throw new EntityNotFoundException("Không tìm thấy Shipper");
        }
    }



    public List<ListShippingResponse> listShippingByShipper(String token) {
        String jwtToken = token.substring(7);
        String email = tokenProvider.getUsernameFromJWT(jwtToken);
        User user = userRepository.findByEmail(email);
        List<Shipping> shippingList = shippingRepository.listShippingForShipper(user.getId());
        return shippingList.stream()
                .map(MapperUtil::mapToShippingResponse)
                .collect(Collectors.toList());
    }






}
