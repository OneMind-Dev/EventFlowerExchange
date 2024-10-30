package fu.gr2.EcommerceProject.mapper;

import fu.gr2.EcommerceProject.dto.request.EventCreateRequest;
import fu.gr2.EcommerceProject.dto.request.EventUpdateRequest;
import fu.gr2.EcommerceProject.dto.response.EventResponse;
import fu.gr2.EcommerceProject.entity.Event;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface EventMapper {
    @Mapping(source = "user.userId", target = "userId")
    @Mapping(source = "eventCategory.name", target = "categoryName") // Map category name from EventCategory
    EventResponse toEventResponse(Event event);

    void updateEvent(@MappingTarget Event event, EventUpdateRequest request);

    Event toEvent(EventCreateRequest request); // Assuming this mapping exists as well
}
