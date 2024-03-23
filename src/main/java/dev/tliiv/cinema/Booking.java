package dev.tliiv.cinema;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Map;

@Document(collection = "bookings")
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Booking {
    @Id
    private ObjectId bookingId;
    private ObjectId hallId;
    private List<Map<String, Object>> showTimes;//Refactor to 2 classes?
    private String imdbId;
}
