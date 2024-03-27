package dev.tliiv.cinema;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CinemaHallsRepository extends MongoRepository<CinemaHalls, String> {

}
