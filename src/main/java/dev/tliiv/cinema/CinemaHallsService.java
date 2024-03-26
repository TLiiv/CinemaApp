package dev.tliiv.cinema;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CinemaHallsService {
    @Autowired
    private CinemaHallsRepository cinemaHallsRepository;
    public List<CinemaHalls> getAllCinemaHalls(){
        return cinemaHallsRepository.findAll();
    }

    public Optional<CinemaHalls> singleHall(ObjectId hallId){
        return cinemaHallsRepository.findById(hallId);
    }
}
