package fu.gr2.EcommerceProject.service;

import fu.gr2.EcommerceProject.entity.Flower;
import fu.gr2.EcommerceProject.dto.response.FlowerResponse;
import fu.gr2.EcommerceProject.mapper.FlowerMapper;
import fu.gr2.EcommerceProject.repository.FlowerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FlowerService {
    private final FlowerRepository flowerRepository;
    private final FlowerMapper flowerMapper;

    public List<FlowerResponse> getAllFlowers(String flowerName, String color) {
        List<Flower> flowers = flowerRepository.findAll();
        if (flowerName != null && !flowerName.isEmpty()) {
            flowers = flowers.stream()
                    .filter(flower -> flower.getFlowerName().contains(flowerName))
                    .collect(Collectors.toList());
        }
        if (color != null && !color.isEmpty()) {
            flowers = flowers.stream()
                    .filter(flower -> flower.getColor().equals(color))
                    .collect(Collectors.toList());
        }
        return flowers.stream().map(flowerMapper::toFlowerResponse).collect(Collectors.toList());
    }
}