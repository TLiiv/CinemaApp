package dev.tliiv.cinema;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

//database access
@Service
public class MovieService {
    @Autowired
    private MovieRepository movieRepository;
    public List<Movie> allMovies(){
        return movieRepository.findAll();
    };

    public Optional<Movie> getMovieById(Object movieId){
        return movieRepository.getMovieById(movieId);
    }
}
