package dev.tliiv.cinema;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private CinemaHallsRepository cinemaHallsRepository;

    public Booking createBooking(ObjectId userId, ObjectId hallId, String movieId, List<String> bookedSeats) {
        // Validate input parameters
        if (userId == null || hallId == null || movieId == null || bookedSeats == null || bookedSeats.isEmpty()) {
            throw new IllegalArgumentException("Invalid booking information");
        }
        if (!areSeatsAvailable(hallId, movieId, bookedSeats)) {
            throw new IllegalArgumentException("Requested seats are not available");
        }

        // Create a new Booking object
        Booking booking = new Booking();
        booking.setUserId(userId);
        booking.setHallId(hallId);
        booking.setMovieId(movieId);
        booking.setBookedSeats(bookedSeats);

        // Save the booking to the database
        booking = bookingRepository.save(booking);
        updateCinemaHallsWithBookedSeats(hallId, movieId, bookedSeats);
        return booking;
    }
    private boolean areSeatsAvailable(ObjectId hallId, String movieId, List<String> bookedSeats) {
        // Retrieve the CinemaHalls document for the specified hallId
        Optional<CinemaHalls> cinemaHallsOptional = cinemaHallsRepository.findById(hallId);
        if (cinemaHallsOptional.isEmpty()) {

            return false;
        }

        CinemaHalls cinemaHalls = cinemaHallsOptional.get();

        // Find the show time for the specified movieId
        Optional<ShowTime> showTimeOptional = cinemaHalls.getShowTimes().stream()
                .filter(showTime -> showTime.getMovieId().equals(movieId))
                .findFirst();

        if (showTimeOptional.isEmpty()) {
            // Show time not found for the movie
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


    private void updateCinemaHallsWithBookedSeats(ObjectId hallId, String movieId, List<String> bookedSeats) {
        // Retrieve the CinemaHalls document for the specified hallId
        Optional<CinemaHalls> cinemaHallsOptional = cinemaHallsRepository.findById(hallId);
        if (cinemaHallsOptional.isEmpty()) {
            // CinemaHalls document not found, handle appropriately (throw exception, log error, etc.)
            return;
        }

        CinemaHalls cinemaHalls = cinemaHallsOptional.get();

        // Find the show time for the specified movieId
        Optional<ShowTime> showTimeOptional = cinemaHalls.getShowTimes().stream()
                .filter(showTime -> showTime.getMovieId().equals(movieId))
                .findFirst();

        if (showTimeOptional.isEmpty()) {
            // Show time not found for the movie, handle appropriately (throw exception, log error, etc.)
            return;
        }

        ShowTime showTime = showTimeOptional.get();

        // Update the bookedSeats array for the corresponding show time
        List<String> alreadyBookedSeats = showTime.getBookedSeats();
        alreadyBookedSeats.addAll(bookedSeats);

        // Save the updated CinemaHalls document
        cinemaHallsRepository.save(cinemaHalls);
    }

}


