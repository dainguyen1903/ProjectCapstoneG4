package js.footballclubmng.controller;

import js.footballclubmng.common.CommonConstant;
import js.footballclubmng.entity.Category;
import js.footballclubmng.model.response.ListPlayerResponse;
import js.footballclubmng.model.response.ResponseAPI;
import js.footballclubmng.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
