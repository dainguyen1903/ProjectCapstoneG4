package js.footballclubmng.service.Impl;

import js.footballclubmng.entity.User;
import js.footballclubmng.model.request.UserRegisterRequest;
import js.footballclubmng.repository.UserRepository;
import js.footballclubmng.service.UserService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

import java.time.LocalDateTime;
import java.util.List;

import static org.mockito.Mockito.mock;


class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;
    @Mock
    private UserService userService;
    AutoCloseable autoCloseable;
    UserRegisterRequest userRegisterRequest;
    User user2;
    List<User> userList;

    @BeforeEach
    void setUp() {
        autoCloseable = MockitoAnnotations.openMocks(this);
        userRegisterRequest = new UserRegisterRequest("linh","bui", "kimanh130201@gmail.com","Linh123123","Linh123123");
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
        mock(UserRegisterRequest.class);
        boolean result = userService.addUser(userRegisterRequest);
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