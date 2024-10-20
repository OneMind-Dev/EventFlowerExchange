package fu.gr2.EcommerceProject.service;

import fu.gr2.EcommerceProject.dto.request.EventCreationRequest;
import fu.gr2.EcommerceProject.dto.request.EventUpdateRequest;
import fu.gr2.EcommerceProject.dto.response.EventResponse;
import fu.gr2.EcommerceProject.entity.Event;
import fu.gr2.EcommerceProject.exception.EventNotFoundException;
import fu.gr2.EcommerceProject.mapper.EventMapper;
import fu.gr2.EcommerceProject.repository.EventRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EventService {
    private final EventRepository eventRepository;
    private final EventMapper eventMapper;

    public List<EventResponse> getAllEvents(UUID categoryId, String eventName) {
        List<Event> events;

        if (categoryId != null && eventName != null && !eventName.isEmpty()) {
            events = eventRepository.findByCategoryIdAndEventNameContaining(categoryId, eventName);
        } else if (categoryId != null) {
            events = eventRepository.findByCategoryId(categoryId);
        } else if (eventName != null && !eventName.isEmpty()) {
            events = eventRepository.findByEventNameContaining(eventName);
        } else {
            events = eventRepository.findAll();
        }

        return events.stream().map(eventMapper::toEventResponse).collect(Collectors.toList());
    }



    @Transactional
    public EventResponse updateEvent(UUID eventId, @Valid EventUpdateRequest request) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new EventNotFoundException(eventId));

        // Map the updated fields from request to the existing event entity
        eventMapper.updateEvent(event, request);

        // Save the updated event entity back to the repository and return the response
        return eventMapper.toEventResponse(eventRepository.save(event));
    }
    public Event createEvent(EventCreationRequest request){
        Event event = new Event();
        event.setCreatedAt(request.getCreatedAt());
        event.setEventName(request.getEventName());
        event.setDescription(request.getDescription());
        event.setFlowerEventRelationships(request.getFlowerEventRelationships());
        event.setImage(request.getImage());
        event.setStartDate(request.getStartDate());
        event.setEndDate(request.getEndDate());
        return eventRepository.save(event);
    }
    public List<EventResponse> getEventByFlowerId(UUID flowerId) {
        List<Event> events = eventRepository.findFlowerEventRelationShop_Flower_FlowerId(flowerId);
        return events.stream().map(eventMapper::toEventResponse).collect(Collectors.toList());
    }
}