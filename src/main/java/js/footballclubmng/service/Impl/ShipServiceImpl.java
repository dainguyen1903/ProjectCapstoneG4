package js.footballclubmng.service.Impl;

import jakarta.persistence.EntityNotFoundException;
import js.footballclubmng.common.MapperUtil;
import js.footballclubmng.entity.Shipping;
import js.footballclubmng.entity.User;
import js.footballclubmng.enums.EOrderStatus;
import js.footballclubmng.enums.EShipStatus;
import js.footballclubmng.model.response.ListShippingResponse;
import js.footballclubmng.repository.ShippingRepository;
import js.footballclubmng.repository.UserRepository;
import js.footballclubmng.service.ShipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ShipServiceImpl implements ShipService {
    @Autowired
    private ShippingRepository shippingRepository;

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
    public void assignToShipper(Long shipperId, Long shippingId) {
        // Kiểm tra xem shipperId và shippingId có tồn tại không
        if (!userRepository.existsById(shipperId)) {
            throw new EntityNotFoundException("Shipper not found");
        }

        Shipping shipping = shippingRepository.findById(shippingId).orElse(null);
        if (shipping == null) {
            throw new EntityNotFoundException("Shipping not found");
        }

        shipping.setShipperId(shipperId);
        shippingRepository.save(shipping);
    }

    public List<ListShippingResponse> listShippingByShipper(Long shipperId) {
        // Kiểm tra xem shipper có tồn tại không
        if(!userRepository.existsById(shipperId)) {
            throw new EntityNotFoundException("Shipper not found");
        }
        List<Shipping> shippingList = shippingRepository.findAllByShipperId(shipperId);
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
