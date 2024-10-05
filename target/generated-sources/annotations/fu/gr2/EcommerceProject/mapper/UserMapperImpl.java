package fu.gr2.EcommerceProject.mapper;

import fu.gr2.EcommerceProject.dto.request.UserCreationRequest;
import fu.gr2.EcommerceProject.dto.request.UserUpdateRequest;
import fu.gr2.EcommerceProject.dto.response.UserResponse;
import fu.gr2.EcommerceProject.entity.User;
import fu.gr2.EcommerceProject.enums.Role;
import java.util.LinkedHashSet;
import java.util.Set;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.4 (Oracle Corporation)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public User toUser(UserCreationRequest request) {
        if ( request == null ) {
            return null;
        }

        User.UserBuilder user = User.builder();

        user.username( request.getUsername() );
        user.password( request.getPassword() );
        user.email( request.getEmail() );
        user.phone( request.getPhone() );
        user.address( request.getAddress() );
        user.avatar( request.getAvatar() );

        return user.build();
    }

    @Override
    public UserResponse toUserResponse(User user) {
        if ( user == null ) {
            return null;
        }

        UserResponse.UserResponseBuilder userResponse = UserResponse.builder();

        userResponse.user_id( user.getUser_id() );
        userResponse.username( user.getUsername() );
        userResponse.email( user.getEmail() );
        userResponse.phone( user.getPhone() );
        userResponse.address( user.getAddress() );
        userResponse.avatar( user.getAvatar() );
        Set<Role> set = user.getRole();
        if ( set != null ) {
            userResponse.role( new LinkedHashSet<Role>( set ) );
        }

        return userResponse.build();
    }

    @Override
    public void updateUser(User user, UserUpdateRequest request) {
        if ( request == null ) {
            return;
        }

        if ( request.getPassword() != null ) {
            user.setPassword( request.getPassword() );
        }
        if ( request.getEmail() != null ) {
            user.setEmail( request.getEmail() );
        }
        if ( request.getPhone() != null ) {
            user.setPhone( request.getPhone() );
        }
        if ( request.getAddress() != null ) {
            user.setAddress( request.getAddress() );
        }
        if ( request.getAvatar() != null ) {
            user.setAvatar( request.getAvatar() );
        }
    }
}
