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

    public boolean bookSeats(String hallId, List<String> seatIds) {
        // Implement booking logic here
        return true; // Placeholder, assuming booking is always successful for now
    }
}
