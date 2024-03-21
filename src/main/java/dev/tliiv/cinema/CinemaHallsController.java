package dev.tliiv.cinema;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/cinema-halls")
public class CinemaHallsController {
    @Autowired
    private CinemaHallsService cinemaHallsService;
    @GetMapping
    public ResponseEntity<List<CinemaHalls>> getAllCinemaHalls(){
        return new ResponseEntity<List<CinemaHalls>>(cinemaHallsService.allCinemaHalls(), HttpStatus.OK);
    }
    @GetMapping("/{hallId}")
    public ResponseEntity<Optional<CinemaHalls>> getSingleHall(@PathVariable String hallId){
        return new ResponseEntity<Optional<CinemaHalls>>(cinemaHallsService.singleHall(hallId), HttpStatus.OK);
    }
}
