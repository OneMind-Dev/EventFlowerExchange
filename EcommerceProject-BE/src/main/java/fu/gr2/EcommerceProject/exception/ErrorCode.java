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
    BANNED(1007,"your account has been banned by admin"),
    LOGGEDOUT(1008,"You has been log out, please log in to continue"),
    ALREADYHAVEROLE(1009,"You already have this role, try another role"),
    FORM_NOT_EXISTED(1010,"form not existed"),
    EVENT_NOT_EXISTED(1011,"Event not existed"),
    FLOWER_NOT_EXISTED(1012,"Flower not existed" ),
    CART_NOT_FOUND(1013,"Cart not exist"),
    ITEM_NOT_FOUND(1014,"Item from cart not found"),
    ACCOUNT_BANNED(1015,"account has been banned"),
    ACCOUNT_NOT_BANNED(1016,"account has not been banned"),
    EMPTY_CART(1017,"không có sản phẩm trong giỏ hàng"),
    NO_INFO(1018,"không có đủ thông tin cần thiết"),
    NO_ORDER(1019,"Chưa có order nào"),
    NO_ROLE_FOUND(1020,"không tìm thấy role"),
    REVIEW_NOT_EXISTED(1021,"review not existed")
    ;
    int code;
    String message;
}
