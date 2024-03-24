package dev.tliiv.cinema;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Document(collection = "bookings")
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Booking {
    @Id
    private ObjectId bookingId;
    private ObjectId hallId;
    private String MovieId;
    private List<Map<String, Object>> showTimes;
    private List<String> bookedSeats;



    public List<String> getSeatIds(List<Map<String, Object>> seats) {
        return seats.stream()
                .map(seat -> (String) seat.get("seatId"))
                .collect(Collectors.toList());
    }
}
