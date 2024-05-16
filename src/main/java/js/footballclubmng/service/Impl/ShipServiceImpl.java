package js.footballclubmng.service.Impl;

import js.footballclubmng.util.MapperUtil;
import js.footballclubmng.config.TokenProvider;
import js.footballclubmng.entity.Shipping;
import js.footballclubmng.entity.User;
import js.footballclubmng.enums.EShipStatus;
import js.footballclubmng.model.dto.UserDto;
import js.footballclubmng.model.response.ListShippingResponse;
import js.footballclubmng.repository.ShippingRepository;
import js.footballclubmng.repository.UserRepository;
import js.footballclubmng.service.ShipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Arrays;
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
        List<Shipping> shippingList = shippingRepository.findAllByOrderByCreateAtDesc();
        return shippingList.stream()
                .map(MapperUtil::mapToShippingResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void assignToShipper(Long shippingId, Long shipperId) {
        Shipping shipping = shippingRepository.findById(shippingId).orElse(null);
        if(shipping != null) {
            shipping.setShipperId(shipperId);
            shipping.setStatus(EShipStatus.AWAITING_PICK_UP_BY_SHIPPER);
            shipping.setUpdateAt(LocalDateTime.now());
            shippingRepository.save(shipping);
        }
    }

    public int countOrderByShipper(Long shipperId) {
        return shippingRepository.countByShipperId(shipperId);
    }

    public List<UserDto> getShipperByShippingId(Long shippingId) {
        Shipping shipping = shippingRepository.findById(shippingId).orElse(null);
        if(shipping != null) {
            List<User> listShipper = userRepository.findByDistrict(shipping.getDistrict());
            return listShipper.stream()
                    .map(MapperUtil::mapToUserDto)
                    .collect(Collectors.toList());
        }
        return null;
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

    public void updateShippingStatus(Long shippingId, String updateStatus) {
        // Kiểm tra xem newStatus có tồn tại trong enum EShipStatus không
        boolean isValidStatus = Arrays.stream(EShipStatus.values())
                .map(Enum::name)
                .anyMatch(status -> status.equals(updateStatus));
        if (!isValidStatus) {
            throw new IllegalArgumentException("Invalid shipping status");
        }


        Shipping shipping = shippingRepository.findById(shippingId).orElse(null);
//        shipping.setStatus(EShipStatus.valueOf(updateStatus));



        // Lưu thay đổi vào cơ sở dữ liệu
        shippingRepository.save(shipping);

    }

    public List<String> getShippingStatusOptions() {
        return Arrays.stream(EShipStatus.values())
                .map(Enum::name)
                .collect(Collectors.toList());
    }


}
