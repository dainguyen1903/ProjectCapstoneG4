package js.footballclubmng.service;

import js.footballclubmng.entity.Category;
import java.util.List;

public interface CategoryService {
    public List<Category> getAllCategory();
    public boolean createCategory(Category category);
    public boolean updateCategory(long id, Category category);
    List<Category> searchCategory(String search);
}
