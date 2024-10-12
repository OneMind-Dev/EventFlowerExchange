package fu.gr2.EcommerceProject.service;


import fu.gr2.EcommerceProject.dto.request.ApiResponse;
import fu.gr2.EcommerceProject.dto.request.FlowerEventRequest;
import fu.gr2.EcommerceProject.dto.response.FlowerEventResponse;
import fu.gr2.EcommerceProject.entity.Event;
import fu.gr2.EcommerceProject.entity.Flower;
import fu.gr2.EcommerceProject.entity.FlowerEventRelationship;
import fu.gr2.EcommerceProject.exception.AppException;
import fu.gr2.EcommerceProject.exception.ErrorCode;
import fu.gr2.EcommerceProject.mapper.EventMapper;
import fu.gr2.EcommerceProject.repository.EventRepository;
import fu.gr2.EcommerceProject.repository.FlowerEventRelationshipRepository;
import fu.gr2.EcommerceProject.repository.FlowerRepository;
import fu.gr2.EcommerceProject.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class FlowerEventRelationshipService {
    EventRepository eventRepository;
    EventMapper eventMapper;
    UserRepository userRepository;
    FlowerRepository flowerRepository;
    private final FlowerEventRelationshipRepository flowerEventRelationshipRepository;

    public ApiResponse<FlowerEventResponse> addFlower(FlowerEventRequest request){

        // Kiểm tra sự tồn tại của Flower
        Optional<Flower> flowerOpt = flowerRepository.findById(request.getFloId());
        if (!flowerOpt.isPresent())
            throw new AppException(ErrorCode.FLOWER_NOT_EXISTED);
        Flower flower = flowerOpt.get();

        // Kiểm tra sự tồn tại của Event
        Optional<Event> eventOpt = eventRepository.findById(request.getEventId());
        if (!eventOpt.isPresent())
            throw new AppException(ErrorCode.EVENT_NOT_EXISTED);
        Event event = eventOpt.get();

        // Tạo và thiết lập FlowerEventRelationship
        FlowerEventRelationship flowerEventRelationship = FlowerEventRelationship.builder()
                .image(request.getImg())
                .quantity(request.getQuantity())
                .floPrice(request.getFloPrice())
                .description(request.getDescription())
                .event(event)  // Thiết lập Event
                .flower(flower) // Thiết lập Flower
                .build();

        // Lưu vào cơ sở dữ liệu
        flowerEventRelationshipRepository.save(flowerEventRelationship);

        // Tạo FlowerEventResponse
        FlowerEventResponse flowerEventResponse = FlowerEventResponse.builder()
                .eventname(event.getEventName())
                .flowername(flower.getFlowerName())
                .origin(flower.getOrigin())
                .color(flower.getColor())
                .description(flowerEventRelationship.getDescription())
                .floPrice(flowerEventRelationship.getFloPrice())
                .createdAt(flowerEventRelationship.getCreatedAt())
                .image(flowerEventRelationship.getImage())
                .quantity(request.getQuantity())
                .build();

        return ApiResponse.<FlowerEventResponse>builder()
                .result(flowerEventResponse)
                .message("Flower added successfully")  // Thêm thông báo thành công
                .build();
    }
}
