package fu.gr2.EcommerceProject.mapper;

import fu.gr2.EcommerceProject.entity.Flower;
import fu.gr2.EcommerceProject.dto.response.FlowerResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface FlowerMapper {
    FlowerResponse toFlowerResponse(Flower flower);
}