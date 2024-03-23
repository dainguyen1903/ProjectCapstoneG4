package js.footballclubmng.service;

import js.footballclubmng.entity.Category;
import java.util.List;

public interface CategoryService {
    public List<Category> getAllCategory();
    public boolean createCategory(Category category);
    public boolean updateCategory(long id, Category category);
    public List<Category> searchCategory(String search);
    public Category getCategoryByName(String name);
    public Category getCategoryById(long id);
}
