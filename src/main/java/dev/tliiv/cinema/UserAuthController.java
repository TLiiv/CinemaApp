package dev.tliiv.cinema;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = "http://localhost:3000")// because of CORS, Front end cannot locally connect otherwise
public class UserAuthController {
    @Autowired
    private UserAuthService userAuthService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        // Authenticate user
        boolean isAuthenticated = userAuthService.authenticateUser(user.getUserEmail(), user.getPassword());

        if (isAuthenticated) {
            // Authentication successful
            return ResponseEntity.ok().build();
        } else {
            // Authentication failed
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestBody User user) {
        boolean isLoggedOut = userAuthService.logoutUser(user.getUserEmail());
        if (isLoggedOut) {
            // Logout successful
            return ResponseEntity.ok().build();
        } else {
            // User not found or not logged in
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
