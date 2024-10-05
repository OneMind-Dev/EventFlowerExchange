package fu.gr2.EcommerceProject.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class AppException extends RuntimeException{

    private ErrorCode errorCode;

    public AppException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }

    public class UserNotFoundException extends RuntimeException {
        public UserNotFoundException(String message) {
            super(message);
        }
    }

    public class UserAlreadyApprovedException extends RuntimeException {
        public UserAlreadyApprovedException(String message) {
            super(message);
        }
    }
}
