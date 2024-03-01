package js.footballclubmng.service.Impl;

import js.footballclubmng.entity.User;
import js.footballclubmng.model.dto.UserRegisterDto;
import js.footballclubmng.repository.UserRepository;
import js.footballclubmng.service.UserService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;


class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;
    @Mock
    private UserService userService;
    AutoCloseable autoCloseable;
    UserRegisterDto userRegisterDto;
    User user2;
    List<User> userList;

    @BeforeEach
    void setUp() {
        autoCloseable = MockitoAnnotations.openMocks(this);
        userRegisterDto = new UserRegisterDto("linh","bui", "kimanh130201@gmail.com","Linh123123","Linh123123");
        user2 = new User("kim","bui", "kimkim130201@gmail.com",
                "Kim123123", LocalDateTime.now(),"user" ,"321321",LocalDateTime.now());
    }


    @AfterEach
    void tearDown() {
        try {
            autoCloseable.close();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Test
    void addUser() {
        mock(UserService.class);
        mock(UserRepository.class);
        mock(UserRegisterDto.class);
        boolean result = userService.addUser(userRegisterDto);
        assertThat(result).isTrue();
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