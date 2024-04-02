package js.footballclubmng.repository;

import js.footballclubmng.entity.Fixtures;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FixturesRepository extends JpaRepository<Fixtures, Long> {

}
