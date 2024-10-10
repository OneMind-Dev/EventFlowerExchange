package fu.gr2.EcommerceProject.service;

import fu.gr2.EcommerceProject.dto.request.ApiResponse;
import fu.gr2.EcommerceProject.dto.request.UserRegistrationRequest;
import fu.gr2.EcommerceProject.dto.response.RegistrationFormResponse;
import fu.gr2.EcommerceProject.entity.RegistrationForm;
import fu.gr2.EcommerceProject.entity.User;
import fu.gr2.EcommerceProject.enums.Role;
import fu.gr2.EcommerceProject.exception.AppException;
import fu.gr2.EcommerceProject.exception.ErrorCode;
import fu.gr2.EcommerceProject.exception.UserAlreadyApprovedException;
import fu.gr2.EcommerceProject.exception.UserNotFound;

import fu.gr2.EcommerceProject.mapper.RegistrationFormMapper;
import fu.gr2.EcommerceProject.repository.RegistrationFormRepository;
import fu.gr2.EcommerceProject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserRegistrationService {

    private final UserRepository userRepository;
    private RegistrationFormRepository registrationFormRepository;
    private RegistrationFormMapper registrationFormMapper;
    @Autowired
    public UserRegistrationService(UserRepository userRepository,
                                   RegistrationFormRepository registrationFormRepository,
                                   RegistrationFormMapper registrationFormMapper) {
        this.userRepository = userRepository;
        this.registrationFormRepository = registrationFormRepository;
        this.registrationFormMapper = registrationFormMapper;
    }

    private User getUserByUsername(String username) throws UserNotFound {
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (!userOpt.isPresent()) {
            throw new UserNotFound("User with username '" + username + "' not found.");
        }
        return userOpt.get();
    }

    public ApiResponse approveRegistration(int formId) {
        try {
            // Tìm kiếm form đăng ký dựa trên formId
            RegistrationForm registrationForm = registrationFormRepository.findById(formId)
                    .orElseThrow(() -> new AppException(ErrorCode.FORM_NOT_EXISTED));

            // Thay đổi trạng thái phê duyệt
            registrationForm.setApproved(true);

            // Lưu lại thay đổi vào cơ sở dữ liệu
            registrationFormRepository.save(registrationForm);

            User user = registrationForm.getUser();
            if (user == null) {
                return ApiResponse.builder()
                        .code(999)
                        .message("User not found in the registration form.")
                        .build();
            }

            Role role = registrationForm.getRole();
            Set<Role> roles = user.getRole();
            if (roles == null) {
                roles = new HashSet<>(); // Khởi tạo nếu vai trò là null
            }

            // Kiểm tra nếu vai trò đã tồn tại
            if (!roles.contains(role)) {
                roles.add(role); // Chỉ thêm nếu chưa có
            }

            user.setRole(roles);
            userRepository.save(user);

            // Trả về phản hồi thành công
            return ApiResponse.builder()
                    .message("Registration form approved successfully.")
                    .build();
        } catch (AppException e) {
            // Xử lý lỗi liên quan đến AppException
            return ApiResponse.builder()
                    .code(999)
                    .message(e.getMessage())
                    .build();
        } catch (Exception e) {
            // Xử lý các lỗi khác
            return ApiResponse.builder()
                    .code(999)
                    .message("Error occurred while approving the registration form.")
                    .build();
        }
    }



    public ApiResponse rejectRegistration(int formId,String reason) {
        if(reason.isEmpty()||reason==null)
            throw new UserNotFound("No reason found");
        try {
            // Tìm kiếm form đăng ký dựa trên formId
            RegistrationForm registrationForm = registrationFormRepository.findById(formId)
                    .orElseThrow(() -> new AppException(ErrorCode.FORM_NOT_EXISTED));

            // Thay đổi trạng thái phê duyệt
            registrationForm.setApproved(false);
            registrationForm.setRejectionReason(reason);

            // Lưu lại thay đổi vào cơ sở dữ liệu
            registrationFormRepository.save(registrationForm);

            // Trả về phản hồi thành công
            return ApiResponse.builder()
                    .message("Registration form reject successfully.")
                    .build();
        } catch (AppException e) {
            // Xử lý lỗi liên quan đến AppException
            return ApiResponse.builder()
                    .code(999)
                    .message(e.getMessage())
                    .build();
        } catch (Exception e) {
            // Xử lý các lỗi khác
            return ApiResponse.builder()
                    .code(999)
                    .message("Error occurred while reject the registration form.")
                    .build();
        }
    }

    public RegistrationFormResponse registerUserRole(String userId,UserRegistrationRequest request) throws UserNotFound {
        Optional<User> existingUserOpt = userRepository.findById(userId);

        if (!existingUserOpt.isPresent()) {
            throw new UserNotFound("No user found");
        }

        User existingUser = existingUserOpt.get();
        Role requestedRole;
        try {
            // Kiểm tra xem chuỗi role truyền vào có hợp lệ không
            requestedRole = Role.valueOf(request.getRole().toUpperCase()); // Chuyển chuỗi sang chữ in hoa để so sánh với enum
        } catch (IllegalArgumentException e) {
            throw new AppException(ErrorCode.BANNED);
        }
        //Check xem user đã có role request chưa
        if(existingUser.getRole().contains(requestedRole))
            throw new AppException(ErrorCode.ALREADYHAVEROLE);


        if (requestedRole == Role.SELLER || requestedRole == Role.SHIPPER) {
            // Sử dụng mapper để chuyển đổi từ UserRegistrationRequest sang RegistrationForm
            RegistrationForm registrationForm = registrationFormMapper.toRegistrationForm(request);
            registrationForm.setUser(existingUser); // Thiết lập User cho RegistrationForm
            registrationForm.setRole(requestedRole); // Thiết lập Role

            // Lưu RegistrationForm vào cơ sở dữ liệu
            registrationFormRepository.save(registrationForm);

            // Ánh xạ sang RegistrationFormResponse
            RegistrationFormResponse registrationFormResponse = registrationFormMapper.toRegistrationFormResponse(registrationForm);
            return registrationFormResponse;
        } else {
            throw new UnsupportedOperationException("Only SELLER or SHIPPER roles can be registered for existing users.");
        }
    }

    public List<RegistrationFormResponse> getRegistrationForm(){
        return registrationFormRepository.findAll()
                .stream()
                .map(registrationFormMapper::toRegistrationFormResponse).toList();
    }
}