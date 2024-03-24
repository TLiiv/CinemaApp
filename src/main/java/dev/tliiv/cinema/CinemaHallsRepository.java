package dev.tliiv.cinema;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CinemaHallsRepository extends MongoRepository<CinemaHalls, ObjectId> {
    Optional<CinemaHalls> findHallByHallId(ObjectId hallId);
}
