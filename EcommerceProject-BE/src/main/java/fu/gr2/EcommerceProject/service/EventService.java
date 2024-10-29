package fu.gr2.EcommerceProject.service;

import fu.gr2.EcommerceProject.dto.request.EventCreationRequest;
import fu.gr2.EcommerceProject.dto.request.EventUpdateRequest;
import fu.gr2.EcommerceProject.dto.response.EventResponse;
import fu.gr2.EcommerceProject.entity.Event;
import fu.gr2.EcommerceProject.entity.User;
import fu.gr2.EcommerceProject.exception.AppException;
import fu.gr2.EcommerceProject.exception.ErrorCode;
import fu.gr2.EcommerceProject.exception.EventNotFoundException;
import fu.gr2.EcommerceProject.mapper.EventMapper;
import fu.gr2.EcommerceProject.repository.EventRepository;
import fu.gr2.EcommerceProject.repository.FlowerRepository;
import fu.gr2.EcommerceProject.repository.UserRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
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

        // Remove events that have not ended
        LocalDateTime checkTime = LocalDateTime.now();
        events.removeIf(event -> event.getEndDate().isBefore(checkTime));  // Corrected: This safely removes the event.


        return events.stream().map(eventMapper::toEventResponse).collect(Collectors.toList());
    }
    @Transactional
    public EventResponse updateEvent(Integer eventId, @Valid EventUpdateRequest request) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new EventNotFoundException(eventId));

        // Update fields based on the request

        event.setCategoryId(request.getCategoryId());
        event.setEventName(request.getEventName());
        event.setDescription(request.getDescription());
        event.setCreatedAt(request.getCreatedAt());
        event.setImage(request.getImage());
        event.setStartDate(request.getStartDate());
        event.setEndDate(request.getEndDate());

        // Save the updated event entity back to the repository and return the response
        return eventMapper.toEventResponse(eventRepository.save(event));
    }
    @Transactional
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

}