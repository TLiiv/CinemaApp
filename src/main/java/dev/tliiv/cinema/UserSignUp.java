package dev.tliiv.cinema;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "users")

public class UserSignUp {
    @NotBlank
    @Indexed(unique = true)
    private String userEmail;
    @NotBlank
    private String password;
}
