package fu.gr2.EcommerceProject.mapper;

import fu.gr2.EcommerceProject.dto.request.EventCreateRequest;
import fu.gr2.EcommerceProject.dto.request.EventUpdateRequest;
import fu.gr2.EcommerceProject.dto.response.EventResponse;
import fu.gr2.EcommerceProject.entity.Event;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface EventMapper {
    @Mapping(source = "user.user_id", target = "userId")
    EventResponse toEventResponse(Event event);

    void updateEvent(@MappingTarget Event event, EventUpdateRequest request);

    Event toEvent(EventCreateRequest request); // New mapping method
}