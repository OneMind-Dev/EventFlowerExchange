package fu.gr2.EcommerceProject.controller;

import com.nimbusds.jose.JOSEException;
import fu.gr2.EcommerceProject.dto.request.ApiResponse;
import fu.gr2.EcommerceProject.dto.request.AuthenticationRequest;
import fu.gr2.EcommerceProject.dto.request.IntrospectRequest;
import fu.gr2.EcommerceProject.dto.request.LogoutRequest;
import fu.gr2.EcommerceProject.dto.response.AuthenticationResponse;
import fu.gr2.EcommerceProject.dto.response.IntrospectResponse;
import fu.gr2.EcommerceProject.service.AuthenticationService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.text.ParseException;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationController {
    @Autowired
    AuthenticationService authenticationService;

    @PostMapping("/login")
    ApiResponse<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request){
        var result = authenticationService.authenticate(request);
        return ApiResponse.<AuthenticationResponse>builder()
                .result(result)
                .build();
    }

    @PostMapping("/introspect")
    ApiResponse<IntrospectResponse> authenticate(@RequestBody IntrospectRequest request) throws ParseException, JOSEException {
        var result = authenticationService.introspect(request);
        return ApiResponse.<IntrospectResponse>builder()
                .result(result)
                .build();
    }
    @PostMapping("/logout")
    ApiResponse<Void> logout(@RequestBody LogoutRequest request)
            throws ParseException, JOSEException {
        authenticationService.logout(request);
        return ApiResponse.<Void>builder()
                .build();
    }

//    @GetMapping("/login/oauth2/code/google")
//    public String googleLogin(@RequestParam("code") String code) {
//        String accessToken = exchangeCodeForToken(code);
//        User user = userService.handleGoogleLogin(accessToken);
//
//
//        return "redirect:/dashboard";
//    }

//    private String exchangeCodeForToken(String code) {
//        String tokenUrl = "https://oauth2.googleapis.com/token";
//        RestTemplate restTemplate = new RestTemplate();
//
//        MultiValueMap<String, String> requestBody = new LinkedMultiValueMap<>();
//        requestBody.add("code", code);
//        requestBody.add("client_id", "394824863031-2e4dcm18unjeo0vom3nf2ir35300qsfq.apps.googleusercontent.com\n");
//        requestBody.add("client_secret", "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\n");
//        requestBody.add("redirect_uri", "http://localhost:8080/login/oauth2/code/google");
//        requestBody.add("grant_type", "authorization_code");
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
//        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(requestBody, headers);
//
//        ResponseEntity<Map<String, Object>> responseEntity = restTemplate.exchange(
//                tokenUrl, HttpMethod.POST, requestEntity, new ParameterizedTypeReference<Map<String, Object>>() {}
//        );
//
//        if (responseEntity.getStatusCode() == HttpStatus.OK) {
//            return (String) responseEntity.getBody().get("access_token");
//        } else {
//            throw new RuntimeException("Failed to exchange code for token: " + responseEntity.getBody());
//        }
    }

