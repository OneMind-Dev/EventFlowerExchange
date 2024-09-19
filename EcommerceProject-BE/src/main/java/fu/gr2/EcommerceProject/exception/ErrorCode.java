package fu.gr2.EcommerceProject.exception;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.experimental.FieldDefaults;

@AllArgsConstructor
@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION( 9999,"uncategorized errror"),
    INVALID_KEY(1001,"Invalid key"),
    USER_EXISTED(1002,"User existed"),
    USERNAME_INVALID(1003,"Username must be atleat 3 characters"),
    PASSWORD_INVALID(1004,"Password must be atleat 8 characters"),
    USER_NOT_EXISTED(1005,"User not existed"),
    UNAUTHENTICATED(1006,"Unauthenticated"),
    ;
    int code;
    String message;
}
