package fu.gr2.EcommerceProject.mapper;

import fu.gr2.EcommerceProject.dto.response.FlowerEventResponse;
import fu.gr2.EcommerceProject.entity.FlowerEventRelationship;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface FlowerEventRelationshipMapper {

    @Mapping(source = "relationshipID", target = "relationshipID")
    @Mapping(source = "event.eventName", target = "eventname")
    @Mapping(source = "flower.flowerName", target = "flowername")
    @Mapping(source = "flower.origin", target = "origin")
    @Mapping(source = "flower.color", target = "color")
    @Mapping(source = "quantity", target = "quantity")
    @Mapping(source = "description", target = "description")
    @Mapping(source = "floPrice", target = "floPrice")
    @Mapping(source = "createdAt", target = "createdAt")
    @Mapping(source = "image", target = "image")
    FlowerEventResponse toFlowerEventResponse(FlowerEventRelationship relationship);
}
