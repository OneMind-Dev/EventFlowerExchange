package fu.gr2.EcommerceProject.service;

import fu.gr2.EcommerceProject.dto.request.FlowerCreateRequest;
import fu.gr2.EcommerceProject.dto.request.FlowerUpdateRequest;
import fu.gr2.EcommerceProject.dto.response.FlowerResponse;
import fu.gr2.EcommerceProject.entity.Flower;
import fu.gr2.EcommerceProject.entity.User;
import fu.gr2.EcommerceProject.exception.AppException;
import fu.gr2.EcommerceProject.exception.ErrorCode;
import fu.gr2.EcommerceProject.mapper.FlowerMapper;
import fu.gr2.EcommerceProject.repository.FlowerRepository;
import fu.gr2.EcommerceProject.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FlowerService {
    private final FlowerRepository flowerRepository;
    private final FlowerMapper flowerMapper;
    private final UserRepository userRepository;


    public FlowerService(final FlowerRepository flowerRepository, final FlowerMapper flowerMapper, final UserRepository userRepository) {
        this.flowerRepository = flowerRepository;
        this.flowerMapper = flowerMapper;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public List<FlowerResponse> getAllFlowers(String flowerName, String color) {
        List<Flower> flowers;

        if (flowerName != null && !flowerName.isEmpty() && color != null && !color.isEmpty()) {
            flowers = flowerRepository.findByFlowerNameContainingAndColor(flowerName, color);
        } else if (flowerName != null && !flowerName.isEmpty()) {
            flowers = flowerRepository.findByFlowerNameContaining(flowerName);
        } else if (color != null && !color.isEmpty()) {
            flowers = flowerRepository.findByColor(color);
        } else {
            flowers = flowerRepository.findAll();
        }

        return flowers.stream()
                .map(flowerMapper::toFlowerResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public FlowerResponse createFlower(FlowerCreateRequest request) {
        //nếu ID bị lỗi thì t cũng bó tay ngồi sữa cả ngày nay chả biết bi gì
        Flower flower = new Flower();
        flower.setFlowerName(request.getFlowerName());
        flower.setOrigin(request.getOrigin());
        flower.setColor(request.getColor());

        // Fetch user by ID and set it
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        flower.setUser(user);

        // Save the flower
        Flower savedFlower = flowerRepository.save(flower);
        return flowerMapper.toFlowerResponse(savedFlower);
    }

    @Transactional
    public FlowerResponse updateFlower(Integer flowerId, FlowerUpdateRequest request) {
        Flower flower = flowerRepository.findById(flowerId)
                .orElseThrow(() -> new AppException(ErrorCode.FLOWER_NOT_EXISTED));

        // Update fields
        if (request.getFlowerName() != null) {
            flower.setFlowerName(request.getFlowerName());
        }
        if (request.getOrigin() != null) {
            flower.setOrigin(request.getOrigin());
        }
        if (request.getColor() != null) {
            flower.setColor(request.getColor());
        }

        // Save the updated flower
        Flower updatedFlower = flowerRepository.save(flower);
        return flowerMapper.toFlowerResponse(updatedFlower);
    }

    public void deleteFlower(Integer flowerId) {
        if (!flowerRepository.existsById(flowerId)) {
            throw new AppException(ErrorCode.FLOWER_NOT_EXISTED);
        }
        flowerRepository.deleteById(flowerId);
    }
    public FlowerResponse getFlowerById(Integer flowerId) {
        Flower flower = flowerRepository.findById(flowerId)
                .orElseThrow(() -> new AppException(ErrorCode.FLOWER_NOT_EXISTED));
        return flowerMapper.toFlowerResponse(flower); // Convert to response DTO
    }
}