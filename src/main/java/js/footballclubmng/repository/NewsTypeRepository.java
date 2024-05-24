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
            " join news n on nt.news_type_id = n.news_type_id where " +
            "(nt.status = 1) and" +
//            "(n.status = 1) and "+
            "(lower(nt.name) like lower(concat('%', :search, '%')))", nativeQuery = true)
    List<NewsType> searchNewsType(String search);

    @Query(value = "select * from news_type nt where nt.status = 1", nativeQuery = true)
    List<NewsType> findAllNewsType();

    @Query(value = "select * from news_type nt where nt.status = 1 and (lower(trim(both from nt.name))) = (lower(trim(both from :name)))", nativeQuery = true)
    NewsType checkNewsTypeExist(String name);
}
