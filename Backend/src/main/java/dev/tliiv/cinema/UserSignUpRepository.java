package dev.tliiv.cinema;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserSignUpRepository extends MongoRepository<User, String> {
    boolean existsByUserEmail(String userEmail);
}
