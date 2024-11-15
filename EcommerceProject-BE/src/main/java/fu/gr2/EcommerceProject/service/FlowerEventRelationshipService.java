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
import fu.gr2.EcommerceProject.mapper.FlowerEventRelationshipMapper;
import fu.gr2.EcommerceProject.repository.EventRepository;
import fu.gr2.EcommerceProject.repository.FlowerEventRelationshipRepository;
import fu.gr2.EcommerceProject.repository.FlowerRepository;
import fu.gr2.EcommerceProject.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class FlowerEventRelationshipService {
    EventRepository eventRepository;
    EventMapper eventMapper;
    UserRepository userRepository;
    FlowerRepository flowerRepository;
    FlowerEventRelationshipMapper flowerEventRelationshipMapper;
    private final FlowerEventRelationshipRepository flowerEventRelationshipRepository;

    public ApiResponse<FlowerEventResponse> getFlowerByRelationshipId(Integer relationshipID){
        FlowerEventRelationship flowerEventRelationship = flowerEventRelationshipRepository.findById(relationshipID).get();
        FlowerEventResponse flowerEventResponse = new FlowerEventResponse();
        flowerEventResponse.setRelationshipID(flowerEventRelationship.getRelationshipID());
        flowerEventResponse.setDescription(flowerEventRelationship.getDescription());
        flowerEventResponse.setFloPrice(flowerEventRelationship.getFloPrice());
        flowerEventResponse.setFlowerId(flowerEventRelationship.getFlower().getFlowerId());
        flowerEventResponse.setEventId(flowerEventRelationship.getEvent().getEventId());
        flowerEventResponse.setEventname(flowerEventRelationship.getEvent().getEventName());
        flowerEventResponse.setOrigin(flowerEventRelationship.getFlower().getOrigin());
        flowerEventResponse.setColor(flowerEventRelationship.getFlower().getColor());
        flowerEventResponse.setCreatedAt(flowerEventRelationship.getCreatedAt());
        flowerEventResponse.setImage(flowerEventRelationship.getImage());
        flowerEventResponse.setQuantity(flowerEventRelationship.getQuantity());
        flowerEventResponse.setFlowername(flowerEventRelationship.getFlower().getFlowerName());
        return ApiResponse.<FlowerEventResponse>builder()
                .result(flowerEventResponse)
                .message("Flowers fetched successfully")
                .build();
    }
    public ApiResponse<FlowerEventResponse> addFlower(FlowerEventRequest request){

        // Kiểm tra sự tồn tại của Flower
        Flower flower = flowerRepository.findById(request.getFloId())
                .orElseThrow(() -> new AppException(ErrorCode.FLOWER_NOT_EXISTED));

        // Kiểm tra sự tồn tại của Event
        Event event = eventRepository.findById(request.getEventId())
                .orElseThrow(() -> new AppException(ErrorCode.EVENT_NOT_EXISTED));

        int quantity = request.getQuantity();


        Optional<FlowerEventRelationship> relationshipOpt =
                flowerEventRelationshipRepository.findByFlowerAndEvent(flower,event);

        FlowerEventRelationship flowerEventRelationship;

        // Tạo và thiết lập FlowerEventRelationship
        if (relationshipOpt.isPresent()) {
            flowerEventRelationship = relationshipOpt.get();
            // Cập nhật số lượng của mối quan hệ hiện có
            flowerEventRelationship.setQuantity(flowerEventRelationship.getQuantity() + quantity);

            flowerEventRelationship.setFloPrice(request.getFloPrice());

        } else {
            // Tạo mối quan hệ mới
            flowerEventRelationship = FlowerEventRelationship.builder()
                    .image(request.getImg())
                    .quantity(quantity)
                    .floPrice(request.getFloPrice())
                    .description(request.getDescription())
                    .event(event)  // Thiết lập Event
                    .flower(flower) // Thiết lập Flower
                    .createdAt(LocalDate.now())
                    .build();
        }

        // Luôn lưu quan hệ mới hoặc đã cập nhật
        flowerEventRelationshipRepository.save(flowerEventRelationship);




        // Tạo FlowerEventResponse
        FlowerEventResponse flowerEventResponse = FlowerEventResponse.builder()
                .relationshipID(flowerEventRelationship.getRelationshipID())
                .eventId(flowerEventRelationship.getEvent().getEventId())
                .flowerId(flowerEventRelationship.getFlower().getFlowerId())
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

    public ApiResponse<List<FlowerEventResponse>> getFlower(int eventId){
        // Tìm các FlowerEventRelationship theo eventId
        List<FlowerEventRelationship> flowerEventRelationships =
                flowerEventRelationshipRepository.findByEvent_EventId(eventId);

        List<FlowerEventResponse> flowerEventResponses = new ArrayList<>();

        // Duyệt qua các FlowerEventRelationship và tạo danh sách response
        for (FlowerEventRelationship relationship : flowerEventRelationships) {
            if (relationship.getQuantity() > 0) {
                flowerEventResponses.add(FlowerEventResponse.builder()
                                .relationshipID(relationship.getRelationshipID())
                        .eventId(relationship.getEvent().getEventId())
                        .eventname(relationship.getEvent().getEventName())
                        .flowerId(relationship.getFlower().getFlowerId())
                        .flowername(relationship.getFlower().getFlowerName())
                        .origin(relationship.getFlower().getOrigin())
                        .color(relationship.getFlower().getColor())
                        .description(relationship.getDescription())
                        .floPrice(relationship.getFloPrice())
                        .createdAt(relationship.getCreatedAt())
                        .image(relationship.getImage())
                        .quantity(relationship.getQuantity())
                        .build());
            }
        }

        return ApiResponse.<List<FlowerEventResponse>>builder()
                .result(flowerEventResponses)
                .message("Flowers fetched successfully")
                .build();
    }
}
