package fu.gr2.EcommerceProject.exception;

public class UserAlreadyApprovedException extends RuntimeException {

    public UserAlreadyApprovedException(String message) {
        super(message);
    }
}