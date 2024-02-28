package js.footballclubmng.repository;

import js.footballclubmng.entity.User;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.time.LocalDateTime;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@DataJpaTest
public class UserRepositoryTest {
    @Autowired private UserRepository userRepository;
    @Autowired private PlayerRepository playerRepository;

    User user;
    @BeforeEach
    void setUp() {
         user =  userRepository.save(new User("linh","bui", "linhbui13@gmail.com",
                 "Linh123123", LocalDateTime.now(),"user" ,"1123456",LocalDateTime.now()));
        userRepository.save(user);
    }
    @AfterEach
    void tearDown() {
        user = null;
        userRepository.deleteAll();
    }

    //test success
    @Test
    void testFindByEmail_Found(){
        User user3 = userRepository.findByEmail("linhbui13@gmail.com");
        assertThat(user3.getUserId()).isEqualTo(user.getUserId());
        assertThat(user3.getOtp()).isEqualTo(user.getOtp());
    }
    //test fail
    @Test
    void testFindByEmail_NotFound(){
        userRepository.save(user);
        User user3 = userRepository.findByEmail("vinhhbui13@gmail.com");
        assertThat(user3 == null).isTrue();
    }
}
