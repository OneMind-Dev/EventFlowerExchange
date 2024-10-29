    package fu.gr2.EcommerceProject.mapper;

    import fu.gr2.EcommerceProject.dto.request.UserRegistrationRequest;
    import fu.gr2.EcommerceProject.dto.response.RegistrationFormResponse;
    import fu.gr2.EcommerceProject.entity.RegistrationForm;
    import org.mapstruct.Mapper;
    import org.mapstruct.Mapping;
    import org.mapstruct.NullValuePropertyMappingStrategy;

    @Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    public interface RegistrationFormMapper {

        @Mapping(source = "user.username", target = "username")
        @Mapping(source = "user.email", target = "email")
        @Mapping(source = "user.phone", target = "phone")
        RegistrationFormResponse toRegistrationFormResponse(RegistrationForm registrationForm);
        @Mapping(target = "user", ignore = true) // Ignoring user field since it will be set in service
        RegistrationForm toRegistrationForm(UserRegistrationRequest userRegistrationRequest);
    }