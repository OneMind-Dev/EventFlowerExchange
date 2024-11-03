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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EventService {
    private static final Logger logger = LoggerFactory.getLogger(EventService.class);
    private final EventRepository eventRepository;
    private final EventMapper eventMapper;
    private final EventCategoryRepository eventCategoryRepository;
    private final UserRepository userRepository;

    public List<EventResponse> getAllEvents(Integer categoryId, String eventName) {
        List<Event> events;

        // Log input parameters
        logger.info("Fetching events with categoryId: {}, eventName: {}", categoryId, eventName);

        // Fetch events based on criteria
        if (categoryId != null && categoryId != 0 && eventName != null && !eventName.isEmpty()) {
            events = eventRepository.findByEventCategory_CategoryIdAndEventName(categoryId, eventName);
        } else if (categoryId != null && categoryId != 0) {
            events = eventRepository.findByEventCategory_CategoryId(categoryId);
        } else if (eventName != null && !eventName.isEmpty()) {
            events = eventRepository.findByEventNameContaining(eventName);
        } else {
            events = eventRepository.findAll();
        }

        // Log the size of the events list
        logger.info("Number of events found: {}", events.size());

        // Ensure the events list is mutable
        List<Event> mutableEvents = new ArrayList<>(events);

        // Remove events that have not ended
        LocalDateTime checkTime = LocalDateTime.now();
        mutableEvents.removeIf(event -> event.getEndDate().isBefore(checkTime));

        // Log the size of mutable events list
        logger.info("Number of events after filtering: {}", mutableEvents.size());

        // Map to EventResponse
        return mutableEvents.stream()
                .map(eventMapper::toEventResponse)
                .collect(Collectors.toList());
    }


    @Transactional
    public EventResponse updateEvent(Integer eventId, @Valid EventUpdateRequest request) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new EventNotFoundException(eventId));

        // Update fields only if they are not null, and handle errors without stopping the process
        if (request.getCategoryId() != null) {
            try {
                event.setEventCategory(eventCategoryRepository.findById(request.getCategoryId())
                        .orElseThrow(ChangeSetPersister.NotFoundException::new));
            } catch (ChangeSetPersister.NotFoundException e) {
                // Log a warning or handle the error as needed without interrupting the update
                System.out.println("Warning: Category not found, category not updated.");
            }
        }
        if (request.getEventName() != null) {
            event.setEventName(request.getEventName());
        }
        if (request.getDescription() != null) {
            event.setDescription(request.getDescription());
        }
        if (request.getImage() != null) {
            event.setImage(request.getImage());
        }
        if (request.getStartDate() != null) {
            event.setStartDate(request.getStartDate());
        }
        if (request.getEndDate() != null) {
            event.setEndDate(request.getEndDate());
        }

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