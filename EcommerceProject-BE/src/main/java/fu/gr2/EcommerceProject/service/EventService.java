package fu.gr2.EcommerceProject.service;

import fu.gr2.EcommerceProject.dto.request.EventCreateRequest;
import fu.gr2.EcommerceProject.dto.request.EventUpdateRequest;
import fu.gr2.EcommerceProject.dto.request.FlowerEventRequest;
import fu.gr2.EcommerceProject.dto.response.EventResponse;
import fu.gr2.EcommerceProject.dto.response.FlowerEventResponse;
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
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class EventService {
    EventRepository eventRepository;
    EventMapper eventMapper;
    UserRepository userRepository;
    FlowerRepository flowerRepository;

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

        for (Event event : events) {
            LocalDateTime checkTime = LocalDateTime.now();
            if(event.getEndDate().isAfter(checkTime)) {
                events.remove(event);
            }
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
        //nếu ID bị lỗi thì t cũng bó tay ngồi sữa cả ngày nay chả biết bi gì
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
                .orElseThrow(() -> new AppException(ErrorCode.EVENT_NOT_EXISTED));
    }

}