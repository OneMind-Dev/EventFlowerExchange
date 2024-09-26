package fu.gr2.EcommerceProject.controller;

import fu.gr2.EcommerceProject.dto.request.EventUpdateRequest;
import fu.gr2.EcommerceProject.dto.response.EventResponse;
import fu.gr2.EcommerceProject.service.EventService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class EventController {
    private final EventService eventService;

    @GetMapping("/api/events")
    public ResponseEntity<List<EventResponse>> getAllEvents(
            @RequestParam(required = false) String categoryId,
            @RequestParam(required = false) String eventName) {
        return ResponseEntity.ok(eventService.getAllEvents(categoryId, eventName));
    }


    @PutMapping("/{eventId}")
    public ResponseEntity<EventResponse> updateEvent(
            @PathVariable UUID eventId,
            @RequestBody @Valid EventUpdateRequest request) {
        return ResponseEntity.ok(eventService.updateEvent(eventId, request));
    }
}