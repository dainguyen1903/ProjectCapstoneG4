package js.footballclubmng.repository;

import js.footballclubmng.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmailAndIsActiveAndDeleteFlg(String email, Boolean isActive, String deleteFlg);

    User findByEmail(String email);

    User findByIdAndDeleteFlgAndAndIsActive(Long id, String deleteFlg, Boolean isActive);

    User findByIdAndIsActive(Long id, Boolean isActive);

    List<User> findByAuthority(String authority);

    User findByEmailAndVerificationCodeAndDeleteFlg(String email, String code, String deleteFlg);

    List<User> findByDistrictAndAuthority(String district, String authority);

    @Query(value = "select * from users u where (u.first_name Like concat('%',:name,'%') or  u.last_name Like concat('%',:name,'%')) and u.is_active = 1 ", nativeQuery = true)
    List<User> getByName(@Param("name") String name);

    boolean existsByEmail(String email);


    @Query(value = "select * from users u where u.is_active = 1 and u.delete_flg = '0' and u.email = :email", nativeQuery = true)
    User checkEmailExist(String email);
}

