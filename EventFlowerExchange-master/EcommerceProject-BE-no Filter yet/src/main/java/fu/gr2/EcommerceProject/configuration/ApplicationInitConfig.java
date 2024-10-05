package fu.gr2.EcommerceProject.configuration;

import fu.gr2.EcommerceProject.entity.User;
import fu.gr2.EcommerceProject.enums.Role;
import fu.gr2.EcommerceProject.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;

@Slf4j
@Configuration
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class ApplicationInitConfig {

    PasswordEncoder passwordEncoder;


    @Bean
    ApplicationRunner applicationRunner(UserRepository userRepository){
        return args -> {
            if(userRepository.findByUsername("admin").isEmpty()){
                var roles = new HashSet<Role>();
                roles.add(Role.valueOf(Role.ADMIN.name()));
                User user = User.builder()
                        .username("admin")
                        .password(passwordEncoder.encode("admin"))
                        .role(roles)
                        .email("defaultemail@gmail.com")
                        .statusUser(true)
                        .build();

                userRepository.save(user);
                log.warn("admin user has been created with default password : admin, please change it");
            }
        };
    }
}
