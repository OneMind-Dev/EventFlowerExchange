package fu.gr2.EcommerceProject.mapper;

import fu.gr2.EcommerceProject.dto.request.EventUpdateRequest;
import fu.gr2.EcommerceProject.dto.response.EventResponse;
import fu.gr2.EcommerceProject.entity.Event;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.4 (Oracle Corporation)"
)
@Component
public class EventMapperImpl implements EventMapper {

    @Override
    public EventResponse toEventResponse(Event event) {
        if ( event == null ) {
            return null;
        }

        EventResponse.EventResponseBuilder eventResponse = EventResponse.builder();

        if ( event.getEventId() != null ) {
            eventResponse.eventId( event.getEventId().toString() );
        }
        eventResponse.categoryId( event.getCategoryId() );
        eventResponse.eventName( event.getEventName() );
        eventResponse.description( event.getDescription() );
        eventResponse.createdAt( event.getCreatedAt() );
        eventResponse.image( event.getImage() );
        eventResponse.startDate( event.getStartDate() );
        eventResponse.endDate( event.getEndDate() );

        return eventResponse.build();
    }

    @Override
    public void updateEvent(Event event, EventUpdateRequest request) {
        if ( request == null ) {
            return;
        }

        event.setEventName( request.getEventName() );
        event.setDescription( request.getDescription() );
        event.setImage( request.getImage() );
        event.setStartDate( request.getStartDate() );
        event.setEndDate( request.getEndDate() );
    }
}
