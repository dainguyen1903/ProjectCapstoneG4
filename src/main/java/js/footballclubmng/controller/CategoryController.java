package js.footballclubmng.controller;

import js.footballclubmng.common.CommonConstant;
import js.footballclubmng.entity.Category;
import js.footballclubmng.model.response.ResponseAPI;
import js.footballclubmng.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @GetMapping(CommonConstant.CATEGORY_API.LIST_CATEGORY)
    public ResponseAPI<List<Category>> listPlayer() {
        List<Category> list  = categoryService.getAllCategory();
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, null, list);
    }

    @PostMapping(CommonConstant.CATEGORY_API.CREATE_CATEGORY)
    public ResponseAPI<Object> createPlayer(@RequestBody @Valid Category category) {
        boolean check = categoryService.createCategory(category);
        if (!check) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.CREATE_CATEGORY_FAIL);
        }
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, CommonConstant.COMMON_MESSAGE.CREATE_CATEGORY_SUCCESS);
    }

    @PutMapping(CommonConstant.CATEGORY_API.UPDATE_CATEGORY)
    public ResponseAPI<Object> updatePlayer(@PathVariable int id, @RequestBody @Valid Category category) {
        boolean check = categoryService.updateCategory(id, category);
        if (!check) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.UPDATE_CATEGORY_FAIL);
        }
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, CommonConstant.COMMON_MESSAGE.UPDATE_CATEGORY_SUCCESS);
    }


}
