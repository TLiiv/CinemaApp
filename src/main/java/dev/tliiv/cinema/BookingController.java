package dev.tliiv.cinema;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @Autowired
    private UserAuthService userAuthService;

    @Autowired
    private CinemaHallsRepository cinemaHallsRepository;

    @PostMapping("/{hallId}/book-seats")
    public ResponseEntity<?> bookSeats(@PathVariable("hallId") String hallId,
                                       @RequestBody Booking booking,
                                       @RequestParam("userEmail") String userEmail) {
        // Check if the user is logged in
        if (!userAuthService.isUserLoggedIn(userEmail)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not logged in.");
        }

        // Fetch the CinemaHalls document based on hallId
        Optional<CinemaHalls> cinemaHallsOptional = cinemaHallsRepository.findById(new ObjectId(hallId));
        if (cinemaHallsOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Hall not found.");
        }
        CinemaHalls cinemaHalls = cinemaHallsOptional.get();

        // Check if the requested seats are available
        List<String> seatIds = booking.getSeatIds(cinemaHalls.getSeats());
        boolean areSeatsAvailable = bookingService.areSeatsAvailable(cinemaHalls.getSeats(), seatIds);
        if (!areSeatsAvailable) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Requested seats are not available.");
        }

        // Book the requested seats
        boolean isBookingSuccessful = bookingService.bookSeats(hallId, seatIds);
        if (isBookingSuccessful) {

            return ResponseEntity.ok("Seats booked successfully!");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to book seats.");
        }
    }
}
