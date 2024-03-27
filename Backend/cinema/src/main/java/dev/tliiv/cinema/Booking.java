package dev.tliiv.cinema;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "bookings")
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Booking {
    @Id
    private String userId;
    private String hallId;
    private String movieId;
    private List<String> bookedSeats;
    private List<String> bookedShowTimes;
}
