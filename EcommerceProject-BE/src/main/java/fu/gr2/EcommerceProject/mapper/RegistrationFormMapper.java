package fu.gr2.EcommerceProject.mapper;

import fu.gr2.EcommerceProject.dto.request.UserRegistrationRequest;
import fu.gr2.EcommerceProject.dto.response.RegistrationFormResponse;
import fu.gr2.EcommerceProject.entity.RegistrationForm;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface RegistrationFormMapper {
    RegistrationForm toRegistrationForm(UserRegistrationRequest userRegistrationRequest); // Chuyển từ UserRegistrationRequest sang RegistrationForm
    RegistrationFormResponse toRegistrationFormResponse(RegistrationForm registrationForm); // Chuyển từ RegistrationForm sang RegistrationFormResponse
}