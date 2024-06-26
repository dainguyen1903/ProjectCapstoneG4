package js.footballclubmng.controller;

import js.footballclubmng.common.CommonConstant;
import js.footballclubmng.entity.Category;
import js.footballclubmng.model.dto.CategoryDto;
import js.footballclubmng.model.response.ResponseAPI;
import js.footballclubmng.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.websocket.server.PathParam;
import java.util.List;

@RestController
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @GetMapping(CommonConstant.CATEGORY_API.LIST_CATEGORY)
    public ResponseAPI<List<CategoryDto>> listPlayer() {
        List<CategoryDto> list  = categoryService.getAllCategory();
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, null, list);
    }

    @PostMapping(CommonConstant.CATEGORY_API.CREATE_CATEGORY)
    @PreAuthorize("hasRole('ROLE_Sale')")
    public ResponseAPI<Object> createPlayer(@RequestBody @Valid Category category) {
        Category category1 = categoryService.getCategoryByName(category.getName());
        if (category1 != null) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.CATEGORY_EXIST);
        }
        boolean check = categoryService.createCategory(category);
        if (!check) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.CREATE_CATEGORY_FAIL);
        }
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, CommonConstant.COMMON_MESSAGE.CREATE_CATEGORY_SUCCESS);
    }

    @PutMapping(CommonConstant.CATEGORY_API.UPDATE_CATEGORY)
    @PreAuthorize("hasRole('ROLE_Sale')")
    public ResponseAPI<Object> updatePlayer(@PathVariable int id, @RequestBody @Valid Category category) {
        CategoryDto category1 = categoryService.getCategoryById(id);
        if (category1 == null) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.NOT_FOUND, CommonConstant.COMMON_MESSAGE.NOT_FOUND_CATEGORY);
        }
        if (!category1.getName().equals(category.getName())) {
            Category category2 = categoryService.getCategoryByName(category.getName());
            if (category2 != null) {
                return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.CATEGORY_EXIST);
            }
        }
        boolean check = categoryService.updateCategory(id, category);
        if (!check) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.UPDATE_CATEGORY_FAIL);
        }
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, CommonConstant.COMMON_MESSAGE.UPDATE_CATEGORY_SUCCESS);
    }

    @GetMapping(CommonConstant.CATEGORY_API.SEARCH_CATEGORY)
    public ResponseAPI<List<CategoryDto>> searchCategory(@RequestParam String search) {
        List<CategoryDto> list = categoryService.searchCategory(search);
        if (list.isEmpty()) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.EMPTY, CommonConstant.COMMON_MESSAGE.NOT_FOUND_CATEGORY);
        }
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, null, list);
    }


    @GetMapping(CommonConstant.CATEGORY_API.DETAIL_CATEGORY)
    public ResponseAPI<CategoryDto> detailCategory(@PathVariable int id) {
        CategoryDto category = categoryService.getCategoryById(id);
        if (category == null) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.NOT_FOUND, CommonConstant.COMMON_MESSAGE.NOT_FOUND_CATEGORY);
        }
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, null, category);
    }

}
