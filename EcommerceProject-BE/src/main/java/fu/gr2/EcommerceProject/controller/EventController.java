//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package fu.gr2.EcommerceProject.controller;

import fu.gr2.EcommerceProject.dto.request.EventCreationRequest;
import fu.gr2.EcommerceProject.dto.request.EventUpdateRequest;
import fu.gr2.EcommerceProject.dto.response.EventResponse;
import fu.gr2.EcommerceProject.entity.Event;
import fu.gr2.EcommerceProject.service.EventService;
import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class EventController {
    private final EventService eventService;
    private final Logger logger = LoggerFactory.getLogger(EventController.class);

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @PostMapping("/event/create")
    public Event createEvent(@RequestBody EventCreationRequest request){
        return eventService.createEvent(request);
    }
    @GetMapping({"/AllEvents"})
    public ResponseEntity<List<EventResponse>> getAllEvents(@RequestParam(required = false) UUID categoryId, @RequestParam(required = false) String eventName) {
        this.logger.info("Getting all events with categoryId: {} and eventName: {}", categoryId, eventName);
        return ResponseEntity.ok(this.eventService.getAllEvents(categoryId, eventName));
    }

    @PutMapping({"/events/eventId"})
    public ResponseEntity<EventResponse> updateEvent(@PathVariable UUID eventId, @RequestBody @Valid EventUpdateRequest request) {
        return ResponseEntity.ok(this.eventService.updateEvent(eventId, request));
    }


}
