package dev.tliiv.cinema;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/signup")
public class UserSignUpController {
    @Autowired
    private UserSignUpService userSignUpService;
    @PostMapping
    public ResponseEntity<?> signUp(@RequestBody UserSignUp signUpRequest) {
        // Validate user input
        if (!isValidSignUpRequest(signUpRequest)) {
            return ResponseEntity.badRequest().build();
        }

        // Attempt to sign up the user
        boolean signUpSuccess = userSignUpService.signUpUser(signUpRequest);

        if (!signUpSuccess) {
            // Failed to create user (e.g., email already exists)
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

        // User successfully created
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    private boolean isValidSignUpRequest(UserSignUp signUpRequest) {
        // Perform validation checks on the signUpRequest object
        return signUpRequest != null && isValidEmail(signUpRequest.getUserEmail())
                && isValidPassword(signUpRequest.getPassword());
    }

    private boolean isValidEmail(String email) {
        // Implement email validation logic
        return true;
    }

    private boolean isValidPassword(String password) {
        // Implement password validation logic
        return true; // Placeholder implementation
    }
}


