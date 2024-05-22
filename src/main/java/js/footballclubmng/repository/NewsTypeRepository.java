package js.footballclubmng.repository;

import js.footballclubmng.entity.NewsType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NewsTypeRepository extends JpaRepository<NewsType,Long> {
    NewsType findByName(String name);
    @Query(value = "select * from news_type nt" +
            " where " +
            "(nt.status = 1) and" +
//            "(n.status = 1) and "+
            "(lower(nt.name) like lower(concat('%', :search, '%')))", nativeQuery = true)
    List<NewsType> searchNewsType(String search);

    @Query(value = "select * from news_type nt where nt.status = 1", nativeQuery = true)
    List<NewsType> findAllNewsType();
}
