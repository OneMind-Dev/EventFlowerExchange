package fu.gr2.EcommerceProject.service;

import fu.gr2.EcommerceProject.dto.request.EventCreateRequest;
import fu.gr2.EcommerceProject.dto.request.EventUpdateRequest;
import fu.gr2.EcommerceProject.dto.response.EventResponse;
import fu.gr2.EcommerceProject.entity.Event;
import fu.gr2.EcommerceProject.entity.EventCategory;
import fu.gr2.EcommerceProject.entity.User;
import fu.gr2.EcommerceProject.exception.EventNotFoundException;
import fu.gr2.EcommerceProject.mapper.EventMapper;
import fu.gr2.EcommerceProject.repository.EventCategoryRepository;
import fu.gr2.EcommerceProject.repository.EventRepository;
import fu.gr2.EcommerceProject.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EventService {
    private final EventRepository eventRepository;
    private final EventMapper eventMapper;
    private final EventCategoryRepository eventCategoryRepository;
    private final UserRepository userRepository;

    public List<EventResponse> getAllEvents(int categoryId, String eventName) {
        List<Event> events;

        if (categoryId != 0 && eventName != null && !eventName.isEmpty()) {
            events = eventRepository.findByEventCategory_CategoryIdAndEventName(categoryId, eventName);
        } else if (categoryId != 0) {
            events = eventRepository.findByEventCategory_CategoryId(categoryId);
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

        event.setEventCategory(eventCategoryRepository.findById(request.getCategoryId()).get());
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
    public EventResponse createEvent(EventCreateRequest request){
        Event event = new Event();
        // Retrieve the EventCategory safely
        EventCategory eventCategory = eventCategoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new EntityNotFoundException("Event Category not found with id: " + request.getCategoryId()));
        event.setEventCategory(eventCategory);

        // Retrieve the User safely
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + request.getUserId()));
        event.setUser(user);

        event.setCreatedAt(request.getCreatedAt());
        event.setEventName(request.getEventName());
        event.setDescription(request.getDescription());
        event.setImage(request.getImage());
        event.setStartDate(request.getStartDate());
        event.setEndDate(request.getEndDate());
        return eventMapper.toEventResponse(eventRepository.save(event));
    }

    public void deleteEvent(Integer eventId) {
        eventRepository.deleteById(eventId);
    }

    public EventResponse getEventById(Integer eventId) {
        return eventMapper.toEventResponse(eventRepository.findById(eventId).get());
    }
    public void updateImage(int eventId, String imgPath) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new IllegalArgumentException("Event không tồn tại"));
        event.setImage(imgPath);

        eventRepository.save(event);
    }

}