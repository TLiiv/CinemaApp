package dev.tliiv.cinema;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/api/v1/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping("/create")
    public ResponseEntity<?> createBooking(@RequestBody Booking booking) {
        try {

            Booking createdBooking = bookingService.createBooking(
                    booking.getUserId(),
                    booking.getHallId(),
                    booking.getMovieId(),
                    booking.getBookedSeats(),
                    booking.getBookedShowTimes()
            );
            return ResponseEntity.status(HttpStatus.CREATED).body(createdBooking);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid booking information: " + e.getMessage());
        }
    }

}





