package fu.gr2.EcommerceProject.service;

import fu.gr2.EcommerceProject.dto.request.EventCreateRequest;
import fu.gr2.EcommerceProject.dto.request.EventUpdateRequest;
import fu.gr2.EcommerceProject.dto.response.EventResponse;
import fu.gr2.EcommerceProject.entity.Event;
import fu.gr2.EcommerceProject.entity.User;
import fu.gr2.EcommerceProject.exception.AppException;
import fu.gr2.EcommerceProject.exception.ErrorCode;
import fu.gr2.EcommerceProject.exception.EventNotFoundException;
import fu.gr2.EcommerceProject.mapper.EventMapper;
import fu.gr2.EcommerceProject.repository.EventRepository;
import fu.gr2.EcommerceProject.repository.UserRepository;
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
    private final UserRepository userRepository;
    public List<EventResponse> getAllEvents(String categoryId, String eventName) {
        List<Event> events;

        if (categoryId != null && !categoryId.isEmpty() && eventName != null && !eventName.isEmpty()) {
            events = eventRepository.findByCategoryIdAndEventNameContaining(categoryId, eventName);
        } else if (categoryId != null && !categoryId.isEmpty()) {
            events = eventRepository.findByCategoryId(categoryId);
        } else if (eventName != null && !eventName.isEmpty()) {
            events = eventRepository.findByEventNameContaining(eventName);
        } else {
            events = eventRepository.findAll();
        }

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
    public EventResponse createEvent(@Valid EventCreateRequest request) {
        Event event = new Event();
        event.setCategoryId(request.getCategoryId());
        event.setEventName(request.getEventName());
        event.setDescription(request.getDescription());
        event.setCreatedAt(request.getCreatedAt());
        event.setImage(request.getImage());
        event.setStartDate(request.getStartDate());
        event.setEndDate(request.getEndDate());

        // Fetch user by ID and set it
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        event.setUser(user);

        // Save the event and return the response
        Event savedEvent = eventRepository.save(event);
        return eventMapper.toEventResponse(savedEvent);
    }
    @Transactional
    public void deleteEvent(Integer eventId) {
        // Check if the event exists
        if (!eventRepository.existsById(eventId)) {
            throw new EventNotFoundException(eventId);
        }

        eventRepository.deleteById(eventId);
    }

    @Transactional
    public Event getEventById(Integer eventId) {
        return eventRepository.findById(eventId)
                .orElseThrow(() -> new AppException(ErrorCode.EVENT_NOT_EXISTED)); // Handle not found
    }
}