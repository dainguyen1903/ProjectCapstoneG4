package js.footballclubmng;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import js.footballclubmng.controller.UserController;
import js.footballclubmng.dto.UserRegisterDto;
import js.footballclubmng.entity.User;
import js.footballclubmng.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(UserController.class)
public class UserControllerTest {
    private static final String END_POIN_PATH = "/user";

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;
    @MockBean
    private UserService userService;

    @Test
    public void testRegisterShouldReturn400BadRequest() throws JsonProcessingException {
        UserRegisterDto userRegisterDto = new UserRegisterDto("","","","","");
        String requestBody = objectMapper.writeValueAsString(userRegisterDto);
        
    }
}
