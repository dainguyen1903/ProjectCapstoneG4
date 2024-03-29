package js.footballclubmng.repository;

import js.footballclubmng.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmailAndDeleteFlg(String email, String deleteFlg);

    User findByEmail(String email);

    User findByIdAndDeleteFlg(long id, String deleteFlg);

    User findByEmailAndVerificationCodeAndDeleteFlg(String email, String code, String deleteFlg);

    @Query(value = "select * from users u where (u.first_name Like concat('%',:name,'%') or  u.last_name Like concat('%',:name,'%')) and u.delete_flg ='0' ", nativeQuery = true)
    List<User> getByName(@Param("name") String name);
    boolean existsByEmail(String email);
}

