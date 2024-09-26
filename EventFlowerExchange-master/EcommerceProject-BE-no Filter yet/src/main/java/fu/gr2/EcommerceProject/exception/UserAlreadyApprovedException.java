package fu.gr2.EcommerceProject.exception;

public class UserAlreadyApprovedException extends RuntimeException {

    public UserAlreadyApprovedException() {
        super("User has already been approved.");
    }

    public UserAlreadyApprovedException(String message) {
        super(message);
    }

    public UserAlreadyApprovedException(String message, Throwable cause) {
        super(message, cause);
    }

    public UserAlreadyApprovedException(Throwable cause) {
        super(cause);
    }

    public UserAlreadyApprovedException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}