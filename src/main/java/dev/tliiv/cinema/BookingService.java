// BookingService.java

package dev.tliiv.cinema;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookingService {

    @Autowired
    private CinemaHallsRepository cinemaHallsRepository;

    public List<String> getSeatIds(String hallId) {
        Optional<CinemaHalls> hallOptional = cinemaHallsRepository.findById(new ObjectId(hallId));
        if (hallOptional.isPresent()) {
            CinemaHalls hall = hallOptional.get();
            return hall.getSeats().stream()
                    .map(seat -> (String) seat.get("seatId"))
                    .collect(Collectors.toList());
        } else {
            return Collections.emptyList(); // Return an empty list if the hall is not found
        }
    }

    public boolean areSeatsAvailable(List<Map<String, Object>> seats, List<String> requestedSeatIds) {
        for (String requestedSeatId : requestedSeatIds) {
            boolean seatFound = false;
            for (Map<String, Object> seat : seats) {
                String seatId = (String) seat.get("seatId");
                if (seatId.equals(requestedSeatId)) {
                    boolean available = (boolean) seat.get("available");
                    if (available) {
                        seatFound = true;
                        break;
                    }
                }
            }
            if (!seatFound) {
                return false;
            }
        }
        return true;
    }

    private Optional<ShowTime> findShowTimeByMovieId(CinemaHalls hall, String movieId) {
        return hall.getShowTimes().stream()
                .filter(showTime -> showTime.getMovieId().equals(movieId))
                .findFirst();
    }



    public boolean bookSeats(String hallId, String movieId, List<String> seatIds) {
        try {
            // Fetch the CinemaHalls document based on hallId
            Optional<CinemaHalls> hallOptional = cinemaHallsRepository.findById(new ObjectId(hallId));
            if (hallOptional.isPresent()) {
                CinemaHalls hall = hallOptional.get();

                // Find the show time for the specified movie
                Optional<ShowTime> showTimeOptional = findShowTimeByMovieId(hall, movieId);

                if (showTimeOptional.isPresent()) {
                    ShowTime showTime = showTimeOptional.get();
                    // Perform the booking logic (update the availability of seats, etc.)
                    List<Map<String, Object>> seats = hall.getSeats();
                    for (Map<String, Object> seat : seats) {
                        String seatId = (String) seat.get("seatId");
                        if (seatIds.contains(seatId)) {
                            seat.put("available", false); // Booked seats are marked as unavailable
                        }
                    }

                    // Save the updated CinemaHalls document
                    cinemaHallsRepository.save(hall);

                    // Return true to indicate successful booking
                    return true;
                } else {
                    // Return false if the show time for the specified movie is not found
                    return false;
                }
            } else {
                // Return false if the hall is not found
                return false;
            }
        } catch (Exception e) {
            // Handle any exceptions that occur during the booking process
            e.printStackTrace(); // Log the exception for debugging
            return false; // Return false to indicate failure
        }
    }

}

