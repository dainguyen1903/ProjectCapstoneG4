package js.footballclubmng.service;

import js.footballclubmng.entity.Category;
import js.footballclubmng.model.dto.CategoryDto;

import java.util.List;

public interface CategoryService {
    public List<CategoryDto> getAllCategory();
    public boolean createCategory(Category category);
    public boolean updateCategory(long id, Category category);
    public List<CategoryDto> searchCategory(String search);
    public Category getCategoryByName(String name);
    public Category getCategoryById(long id);
}
