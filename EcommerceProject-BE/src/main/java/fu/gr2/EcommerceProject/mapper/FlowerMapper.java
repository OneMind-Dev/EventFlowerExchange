package fu.gr2.EcommerceProject.mapper;

import fu.gr2.EcommerceProject.entity.Flower;
import fu.gr2.EcommerceProject.dto.response.FlowerResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface FlowerMapper {

    @Mapping(source = "user.user_id", target = "userId") // Make sure user_id correctly maps to userId of response
    FlowerResponse toFlowerResponse(Flower flower);
}