package js.footballclubmng.repository;

import js.footballclubmng.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    List<User> findByAccountAndPassword(String account, String password);
    public User findByAccount(String account);
    public User findByGmail(String gmail);
}