package js.footballclubmng.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;
import js.footballclubmng.entity.User;
import js.footballclubmng.model.request.UserRegisterRequest;
import js.footballclubmng.service.UserService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(UserController.class)
@ContextConfiguration(classes = {UserController.class})
@TestPropertySource(properties = {
        "spring.security.enabled=false",
       "spring.mvc.hiddenmethod.filter.enabled=false"
})
class UserControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private UserService userService;

    UserRegisterRequest userRegisterRequest;
    User user2;
    List<User> userList;

    @BeforeEach
    void setUp() {
        userRegisterRequest = new UserRegisterRequest("linh","bui", "kimanh130201@gmail.com","Linh123123","Linh123123");
        user2 = new User("kim","bui", "kimkim130201@gmail.com",
                "Kim123123", LocalDateTime.now(),"user" ,"321321",LocalDateTime.now());
    }

    @AfterEach
    void tearDown() {
    }

    @Test
    void testRegister() throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        ObjectWriter objectWriter = objectMapper.writer().withDefaultPrettyPrinter();
        String requestJson = objectWriter.writeValueAsString(userRegisterRequest);

        when(userService.addUser(userRegisterRequest)).thenReturn(true);
        this.mockMvc.perform(post("/api/user/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestJson))
                .andDo(print()).andExpect(status().isOk());

    }

    @Test
    void verifyOtp() {
    }

    @Test
    void generateOtp() {
    }

    @Test
    void resetPassword() {
    }

    @Test
    void updatePassword() {
    }
}