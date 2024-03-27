package dev.tliiv.cinema;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private CinemaHallsRepository cinemaHallsRepository;
    @Autowired MovieRepository movieRepository;
    @Autowired UserRepository userRepository;
    @Autowired MovieService movieService;

    public Booking createBooking(ObjectId userId, ObjectId hallId, ObjectId movieId, List<String> bookedSeats, List<String> bookedShowTimes) {
        // Validate input parameters
        if (userId == null || hallId == null || movieId == null || bookedSeats == null || bookedSeats.isEmpty()) {
            throw new IllegalArgumentException("Invalid booking information");
        }
        if (!areSeatsAvailable(hallId, movieId, bookedSeats)) {
            throw new IllegalArgumentException("Requested seats are not available");
        }
        if (!areSeatsValid(hallId, bookedSeats)) {
            throw new IllegalArgumentException("Invalid seat(s) requested");
        }
        if (!areCorrectShowTimes(hallId, movieId, bookedShowTimes)) {
            throw new IllegalArgumentException("Incorrect show time(s) for the movie");
        }

        Optional<Movie> movieOptional = movieService.findById(movieId);
        if (movieOptional.isEmpty()) {
            throw new IllegalArgumentException("Movie not found");
        }
        Movie movie = movieOptional.get();

        // Retrieve user information
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            throw new IllegalArgumentException("User not found");
        }
        User user = userOptional.get();

        // Add booked movie genres to the user's preferred genres list
        List<String> userPreferredGenres = new ArrayList<>(user.getPreferredGenres());
        List<String> movieGenres = movie.getGenres();
        for (String genre : movieGenres) {
            if (!userPreferredGenres.contains(genre)) {
                userPreferredGenres.add(genre);
            }
        }
        user.setPreferredGenres(userPreferredGenres);

        // Update user document
        userRepository.save(user);

        // Create a new Booking object
        Booking booking = new Booking();
        booking.setUserId(userId);
        booking.setHallId(hallId);
        booking.setMovieId(movieId);
        booking.setBookedSeats(bookedSeats);
        booking.setBookedShowTimes(bookedShowTimes);


        // Save the booking to the database
        booking = bookingRepository.save(booking);
        updateCinemaHallsWithBookedSeats(hallId, movieId, bookedSeats);
        return booking;
    }
    private boolean areSeatsAvailable(ObjectId hallId, ObjectId movieId, List<String> bookedSeats) {
        // Retrieve the CinemaHalls document for the specified hallId
        Optional<CinemaHalls> cinemaHallsOptional = cinemaHallsRepository.findById(hallId);
        if (cinemaHallsOptional.isEmpty()) {

            return false;
        }

        CinemaHalls cinemaHalls = cinemaHallsOptional.get();


        // Find the showtime for the specified movieId
        Optional<ShowTime> showTimeOptional = cinemaHalls.getShowTimes().stream()
                .filter(showTime -> showTime.getMovieId().equals(movieId))
                .findFirst();

        if (showTimeOptional.isEmpty()) {
            // Showtime not found for the movie
            return false;
        }

        ShowTime showTime = showTimeOptional.get();

        // Check if any of the requested bookedSeats are already booked
        List<String> alreadyBookedSeats = showTime.getBookedSeats();
        for (String seat : bookedSeats) {
            if (alreadyBookedSeats.contains(seat)) {
                // Seat is already booked
                return false;
            }
        }

        // All requested seats are available
        return true;
    }

    private boolean areSeatsValid(ObjectId hallId, List<String> bookedSeats) {
        // Retrieve the CinemaHalls document for the specified hallId
        Optional<CinemaHalls> cinemaHallsOptional = cinemaHallsRepository.findById(hallId);
        if (cinemaHallsOptional.isEmpty()) {
            return false;
        }

        CinemaHalls cinemaHalls = cinemaHallsOptional.get();
        Set<String> availableSeats = Set.copyOf(cinemaHalls.getSeats());

        // Check if all booked seats are valid
        return bookedSeats.stream().allMatch(availableSeats::contains);
    }
    private boolean areCorrectShowTimes(ObjectId hallId, Object movieId, List<String> requestedShowTimes) {
        // Retrieve the CinemaHalls document for the specified hallId
        Optional<CinemaHalls> cinemaHallsOptional = cinemaHallsRepository.findById(hallId);
        if (cinemaHallsOptional.isEmpty()) {
            return false;
        }

        CinemaHalls cinemaHalls = cinemaHallsOptional.get();

        // Check if each requested show time matches the movie ID
        for (String requestedShowTime : requestedShowTimes) {
            Optional<ShowTime> showTimeOptional = cinemaHalls.getShowTimes().stream()
                    .filter(showTime -> showTime.getMovieId().equals(movieId) && showTime.getStartTime().equals(requestedShowTime))
                    .findFirst();

            if (showTimeOptional.isEmpty()) {
                return false; // Show time not found for the movie
            }
        }

        return true; // All requested show times are correct for the movie
    }

    private void updateCinemaHallsWithBookedSeats(ObjectId hallId, ObjectId movieId, List<String> bookedSeats) {
        // Retrieve the CinemaHalls document for the specified hallId
        Optional<CinemaHalls> cinemaHallsOptional = cinemaHallsRepository.findById(hallId);
        if (cinemaHallsOptional.isEmpty()) {
            // CinemaHalls document not found, handle appropriately (throw exception, log error, etc.)
            return;
        }

        CinemaHalls cinemaHalls = cinemaHallsOptional.get();

        // Find the showtime for the specified movieId
        Optional<ShowTime> showTimeOptional = cinemaHalls.getShowTimes().stream()
                .filter(showTime -> showTime.getMovieId().equals(movieId))
                .findFirst();

        if (showTimeOptional.isEmpty()) {
            // Showtime not found for the movie, handle appropriately (throw exception, log error, etc.)
            return;
        }

        ShowTime showTime = showTimeOptional.get();

        // Update the bookedSeats array for the corresponding showtime
        List<String> alreadyBookedSeats = showTime.getBookedSeats();
        alreadyBookedSeats.addAll(bookedSeats);

        // Save the updated CinemaHalls document
        cinemaHallsRepository.save(cinemaHalls);
    }

}


