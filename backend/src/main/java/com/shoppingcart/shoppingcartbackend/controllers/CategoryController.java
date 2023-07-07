package com.shoppingcart.shoppingcartbackend.controllers;

import com.shoppingcart.shoppingcartbackend.models.Category;
import com.shoppingcart.shoppingcartbackend.models.ResponseObject;
import com.shoppingcart.shoppingcartbackend.services.ICategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/api/v1/categories")
public class CategoryController {

    private final ICategoryService categoryService;

    public CategoryController(ICategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("")
    public ResponseEntity<ResponseObject> getAllCategories() {
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("success", "Category List", categoryService.findAll())
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseObject> getCategoryById(@PathVariable Long id) {
        Category foundCategory = categoryService.findById(id);

        if (foundCategory != null) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("success", "Category exists", foundCategory)
            );
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("failed", "Category " + id + " doesn't exist", null)
            );
        }
    }

    @PostMapping("")
    public ResponseEntity<ResponseObject> insertCategory(@RequestBody Category category) {
        Category foundCategory = categoryService.findByCategoryName(category.getCategoryName().trim());

        if(foundCategory != null) {
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                    new ResponseObject("failed", "Category name exists", null)
            );
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("success", "Insert category successfully", categoryService.save(category))
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseObject> updateCategory(@RequestBody Category newCategory, @PathVariable Long id) {
        Category foundCategory = categoryService.findById(id);
        if(foundCategory != null) {
            foundCategory.setCategoryName(newCategory.getCategoryName());
            foundCategory.setDescription(newCategory.getDescription());
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("success", "Update category successfully", categoryService.save(foundCategory))
            );
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("success", "Insert category successfully", categoryService.save(newCategory))
            );
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseObject> deleteCategory(@PathVariable Long id) {
        boolean exist = categoryService.existsById(id);
        if(exist) {
            categoryService.deleteById(id);
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("success", "delete category successfully", null)
        );
    }
}
