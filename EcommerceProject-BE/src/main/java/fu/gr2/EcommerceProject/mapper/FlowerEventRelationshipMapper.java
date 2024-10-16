package fu.gr2.EcommerceProject.mapper;


import fu.gr2.EcommerceProject.entity.FlowerEventRelationship;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface FlowerEventRelationshipMapper {
}
