package js.footballclubmng.service.Impl;

import js.footballclubmng.entity.Category;
import js.footballclubmng.repository.CategoryRepository;
import js.footballclubmng.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;
    @Override
    public List<Category> getAllCategory() {
        List<Category> list;
        list = categoryRepository.findAll();
        return list;
    }

    @Override
    public boolean createCategory(Category category) {
        try {
            Category category1 = new Category();
            category1.setName(category.getName());
            categoryRepository.save(category1);
            return true;
        }catch (Exception e){
            return false;
        }
    }

    @Override
    public boolean updateCategory(long id, Category category) {
        try {
            Category category1 = categoryRepository.findById(id).orElse(null);
            if (category1 != null) {
                category1.setName(category.getName());
                categoryRepository.save(category1);
                return true;
            }
        } catch (Exception e) {
            return false;
        }
        return false;
    }

    @Override
    public boolean deleteCategory(long id) {
        return false;
    }
}
