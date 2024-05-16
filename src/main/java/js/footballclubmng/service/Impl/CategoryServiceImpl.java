package js.footballclubmng.service.Impl;

import js.footballclubmng.common.MapperUtil;
import js.footballclubmng.entity.Category;
import js.footballclubmng.model.dto.CategoryDto;
import js.footballclubmng.repository.CategoryRepository;
import js.footballclubmng.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<CategoryDto> getAllCategory() {
        List<Category> listCategory;
        listCategory = categoryRepository.viewAllCategory();
        return listCategory.stream()
                .map(MapperUtil::mapToCategoryDto)
                .collect(Collectors.toList());
    }

    @Override
    public boolean createCategory(Category category) {
        try {
            Category category1 = new Category();
            category1.setName(category.getName());
            category1.setStatus(true);
            categoryRepository.save(category1);
            return true;
        } catch (Exception e) {
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
    public List<CategoryDto> searchCategory(String search) {
        try {
            List<Category> list = categoryRepository.searchCategory(search);
            return list.stream()
                    .map(MapperUtil::mapToCategoryDto)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public Category getCategoryByName(String name) {
        try {
            Category category = categoryRepository.findCategoryByName(name);
            return category;
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public Category getCategoryById(long id) {
        Category category = categoryRepository.findById(id).orElse(null);
        return category;
    }

}
