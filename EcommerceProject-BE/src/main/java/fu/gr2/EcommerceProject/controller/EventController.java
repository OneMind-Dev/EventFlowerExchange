//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package fu.gr2.EcommerceProject.controller;

import fu.gr2.EcommerceProject.dto.request.ApiResponse;
import fu.gr2.EcommerceProject.dto.request.EventUpdateRequest;
import fu.gr2.EcommerceProject.dto.request.FlowerEventRequest;
import fu.gr2.EcommerceProject.dto.response.EventResponse;
import fu.gr2.EcommerceProject.dto.response.FlowerEventResponse;
import fu.gr2.EcommerceProject.service.EventService;
import fu.gr2.EcommerceProject.service.FlowerEventRelationshipService;
import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import fu.gr2.EcommerceProject.dto.request.EventCreateRequest;
import fu.gr2.EcommerceProject.entity.Event;
import fu.gr2.EcommerceProject.service.EventService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class EventController {
    EventService eventService;
    Logger logger = LoggerFactory.getLogger(EventController.class);
    FlowerEventRelationshipService flowerEventRelationshipService;


    @GetMapping({"/AllEvents"})
    public ResponseEntity<List<EventResponse>> getAllEvents(@RequestParam(required = false) String categoryId, @RequestParam(required = false) String eventName) {
        this.logger.info("Getting all events with categoryId: {} and eventName: {}", categoryId, eventName);
        return ResponseEntity.ok(this.eventService.getAllEvents(categoryId, eventName));
    }

//    @PutMapping({"/events/eventId"})
//    public ResponseEntity<EventResponse> updateEvent(@PathVariable UUID eventId, @RequestBody @Valid EventUpdateRequest request) {
//        return ResponseEntity.ok(this.eventService.updateEvent(eventId, request));
//    }


    @PutMapping("/UpdateEvent/{eventId}")
    public ResponseEntity<EventResponse> updateEvent(
            @PathVariable Integer eventId,
            @RequestBody @Valid EventUpdateRequest request) {
        EventResponse updatedEvent = eventService.updateEvent(eventId, request);
        return ResponseEntity.ok(updatedEvent);
    }

    @PostMapping("/CreateEvent")
    public ResponseEntity<EventResponse> createEvent(@RequestBody @Valid EventCreateRequest request) {
        logger.info("Creating a new event");
        EventResponse eventResponse = eventService.createEvent(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(eventResponse);
    } //remember to take admin token :skull:
    @DeleteMapping("/DeleteEvent/{eventId}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Integer eventId) {
        eventService.deleteEvent(eventId);
        return ResponseEntity.noContent().build();
    }//delete thì cái ID nó cũng không xuống đâu (chắc vậy) tại vì cái Data Integrity (chắc vậy)

    @GetMapping("/SelectEvent/{eventId}")
    public ResponseEntity<Event> getEventById(@PathVariable Integer eventId) {
        Event event = eventService.getEventById(eventId);
        return ResponseEntity.ok(event);
    } // t thấy cái này nhìn ok hơn nếu không thích thì t sẽ chỉnh lại giống cái flower


    @PostMapping("/AddFlowerToEvent")
    public ApiResponse<FlowerEventResponse> addFlowerToEvent(@RequestBody FlowerEventRequest request){
            return flowerEventRelationshipService.addFlower(request);
    }

}
