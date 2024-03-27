package dev.tliiv.cinema;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
    User findByUserEmail(String userEmail);
}
