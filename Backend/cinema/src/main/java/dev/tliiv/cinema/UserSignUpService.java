package dev.tliiv.cinema;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserSignUpService {
    @Autowired
    private UserSignUpRepository userSignUpRepository;

    public boolean signUpUser(UserSignUp signUpRequest) {
        // Check if the email already exists
        if (userSignUpRepository.existsByUserEmail(signUpRequest.getUserEmail())) {
            return false; // Email already registered
        }

        // Create a new User object
        User user = new User();
        user.setUserEmail(signUpRequest.getUserEmail());
        user.setPassword(signUpRequest.getPassword());
        user.setLoggedIn(false); // Set default value
        user.setPreferredGenres(new ArrayList<>()); // Set default value

        // Save the user to the database
        userSignUpRepository.save(user);
        return true;
    }
}

