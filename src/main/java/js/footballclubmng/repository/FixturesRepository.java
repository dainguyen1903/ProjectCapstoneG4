package js.footballclubmng.repository;

import js.footballclubmng.entity.Fixtures;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FixturesRepository extends JpaRepository<Fixtures, Long> {
    @Query(value = "select * from fixtures f where f.status = 1", nativeQuery = true)
    List<Fixtures> viewAllFixtures();
}
