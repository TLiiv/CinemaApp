package dev.tliiv.cinema;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShowTime {
//    @JsonSerialize(using = ObjectIdSerializer.class)
//    @JsonDeserialize(using = ObjectIdDeserializer.class)
    private String startTime;
    private String movieId;
    private List<String> bookedSeats;
}

