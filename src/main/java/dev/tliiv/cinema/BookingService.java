// BookingService.java

package dev.tliiv.cinema;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    public Booking createBooking(ObjectId userId, ObjectId hallId, String movieId, List<String> bookedSeats) {
        // Validate input parameters
        if (userId == null || hallId == null || movieId == null || bookedSeats == null || bookedSeats.isEmpty()) {
            throw new IllegalArgumentException("Invalid booking information");
        }

        // Create a new Booking object
        Booking booking = new Booking();
        booking.setUserId(userId);
        booking.setHallId(hallId);
        booking.setMovieId(movieId);
        booking.setBookedSeats(bookedSeats);

        // Save the booking to the database
        return bookingRepository.save(booking);
    }
}


