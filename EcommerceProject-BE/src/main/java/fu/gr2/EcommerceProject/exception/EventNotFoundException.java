package fu.gr2.EcommerceProject.exception;

public class EventNotFoundException extends RuntimeException {
    public EventNotFoundException(Integer eventId) {
        super("Event with ID " + eventId + " not found");
    }
}