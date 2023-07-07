package com.shoppingcart.shoppingcartbackend.services;

import com.shoppingcart.shoppingcartbackend.models.Category;

import java.util.List;

public interface ICategoryService {
    Category save(Category category);
    List<Category> findAll();
    Category findById(Long id);
    Category findByCategoryName(String categoryName);
    boolean existsById(Long id);
    void deleteById(Long id);
}
