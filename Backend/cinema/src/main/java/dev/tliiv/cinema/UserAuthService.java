package dev.tliiv.cinema;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserAuthService {
    @Autowired
    private UserRepository userRepository;

    public boolean authenticateUser(String userEmail, String password) {
        User user = userRepository.findByUserEmail(userEmail);
        if (user != null && user.getPassword().equals(password)) {
            // Update isLoggedIn status to true
            user.setLoggedIn(true);
            userRepository.save(user);
            return true;
        }
        return false;
    }

    public boolean logoutUser(String userEmail) {
        User user = userRepository.findByUserEmail(userEmail);
        if (user != null && user.isLoggedIn()) {
            // Update isLoggedIn status to false
            user.setLoggedIn(false);
            userRepository.save(user);
            return true;
        }
        return false;
    }
    public boolean updateLoggedInStatus(String userEmail, boolean loggedInStatus) {
        User user = userRepository.findByUserEmail(userEmail);
        if (user != null) {
            user.setLoggedIn(loggedInStatus);
            userRepository.save(user);
            return true;
        }
        return false;
    }
}


