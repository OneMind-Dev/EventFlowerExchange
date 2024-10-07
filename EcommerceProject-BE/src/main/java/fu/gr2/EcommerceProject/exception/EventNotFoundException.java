package fu.gr2.EcommerceProject.exception;

import java.util.UUID;

public class EventNotFoundException extends RuntimeException {
    public EventNotFoundException(UUID eventId) {
        super("Event with ID " + eventId + " not found");
    }
}