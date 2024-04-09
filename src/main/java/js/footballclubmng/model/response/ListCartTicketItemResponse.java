package js.footballclubmng.model.response;

import js.footballclubmng.entity.CartTicket;
import js.footballclubmng.entity.Fixtures;
import js.footballclubmng.model.dto.FixturesDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ListCartTicketItemResponse {
    private Long CartTicketItemId;
    private FixturesDto fixtures;
    private Integer quantity;
}
