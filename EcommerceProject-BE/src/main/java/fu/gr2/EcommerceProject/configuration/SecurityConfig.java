package fu.gr2.EcommerceProject.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.crypto.spec.SecretKeySpec;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final String[] PUBLIC_ENDPOINTS = { "/users/register",
            "/auth/login",
            "/auth/introspect",
            "/auth/logout",
            "/auth/introspect   ",
            "/AllEvents",
            "/api/flowers",
            "/v3/api-docs",
            "/swagger-resources/**",
            "/swagger-ui/**",
            "/webjars/**",
            "users/registerRole/{userId}",
            "/admin/approveRegistration/{formId}",
            "/admin/rejectRegistration/{formId}",
            "/admin/registerForm",};

    @Value("${jwt.signerKey}")
    private String signerKey;

    @Autowired
    private CustomJwtDecoder customJwtDecoder;
    //config truy cap duong dan cua cac role
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .authorizeHttpRequests(request -> request
                        .requestMatchers(HttpMethod.POST, PUBLIC_ENDPOINTS).permitAll()  // Không yêu cầu JWT
                        .requestMatchers(HttpMethod.GET, PUBLIC_ENDPOINTS).permitAll()   // Không yêu cầu JWT
                        .requestMatchers(HttpMethod.GET, "/users").hasAuthority("SCOPE_ADMIN")
                        .requestMatchers(HttpMethod.POST, "/admin/AdminRegister").hasAuthority("SCOPE_ADMIN")
                        .requestMatchers(HttpMethod.DELETE).hasAuthority("SCOPE_ADMIN")
                        .anyRequest().authenticated()  // Yêu cầu JWT với các request khác
                )
                .oauth2ResourceServer(oauth2 -> oauth2.jwt(jwtConfigurer -> jwtConfigurer.decoder(customJwtDecoder)))
                .csrf(AbstractHttpConfigurer::disable);

        return httpSecurity.build();
    }
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("*");  // Cho phép tất cả nguồn (origin)
        configuration.addAllowedMethod("*");  // Cho phép tất cả phương thức HTTP (GET, POST, PUT, DELETE, ...)
        configuration.addAllowedHeader("*");  // Cho phép tất cả headers

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);  // Áp dụng cấu hình cho tất cả các đường dẫn
        return source;
    }

    @Bean
    JwtDecoder jwtDecoder(){
        SecretKeySpec secretKeySpec = new SecretKeySpec(signerKey.getBytes(), "HS512");

        return NimbusJwtDecoder.withSecretKey(secretKeySpec)
                .macAlgorithm(MacAlgorithm.HS512)
                .build();
    }

    @Bean
    PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder(10);
    }
}
