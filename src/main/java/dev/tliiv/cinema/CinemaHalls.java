package dev.tliiv.cinema;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection ="cinema-halls")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CinemaHalls {
    @Id
    private ObjectId id;
    private String hallId;
    private String hallName;
    private List<Object> seats;
}
