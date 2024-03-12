package js.footballclubmng.service;

import js.footballclubmng.entity.Category;
import js.footballclubmng.entity.Player;
import js.footballclubmng.model.response.ListPlayerResponse;

import java.util.List;

public interface CategoryService {
    public List<Category> getAllCategory();
    public boolean createCategory(Category category);
    public boolean updateCategory(long id, Category category);
    public boolean deleteCategory(long id);
}
