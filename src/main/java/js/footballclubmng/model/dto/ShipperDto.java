package js.footballclubmng.model.dto;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ShipperDto {

    private Long id;

    private String email;

    private String authority;

    private String firstName;

    private String lastName;

    private String address;

    private String ward;

    private String district;

    private String province;

    private Date dateOfBirth;

    private String gender;

    private String imageUrl;

}
