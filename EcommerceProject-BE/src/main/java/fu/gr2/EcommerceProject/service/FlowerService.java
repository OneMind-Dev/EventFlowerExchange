package fu.gr2.EcommerceProject.service;

import fu.gr2.EcommerceProject.dto.response.FlowerResponse;
import fu.gr2.EcommerceProject.entity.Flower;
import fu.gr2.EcommerceProject.mapper.FlowerMapper;
import fu.gr2.EcommerceProject.repository.FlowerRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import java.util.stream.Collectors;

@Service
public class FlowerService {
    private final FlowerRepository flowerRepository;
    private final FlowerMapper flowerMapper;

    public FlowerService(final FlowerRepository flowerRepository, final FlowerMapper flowerMapper) {
        this.flowerRepository = flowerRepository;
        this.flowerMapper = flowerMapper;
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
}