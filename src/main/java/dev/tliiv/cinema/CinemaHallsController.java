package dev.tliiv.cinema;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/cinema-halls")
@CrossOrigin(origins = "http://localhost:3000")// because of CORS, Front end cannot locally connect otherwise
public class CinemaHallsController {
    @Autowired
    private CinemaHallsService cinemaHallsService;

    @GetMapping
    public ResponseEntity<List<CinemaHalls>> getAllCinemaHalls(){
        return new ResponseEntity<List<CinemaHalls>>(cinemaHallsService.getAllCinemaHalls(),HttpStatus.OK);
    }
    @GetMapping("/{hallId}")
    public ResponseEntity<Optional<CinemaHalls>> getSingleHall(@PathVariable ObjectId hallId){
        return new ResponseEntity<Optional<CinemaHalls>>(cinemaHallsService.singleHall(hallId), HttpStatus.OK);
    }
}
