package com.shoppingcart.shoppingcartbackend.services;

import com.shoppingcart.shoppingcartbackend.models.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IProductService {
    Product save(Product product);
    List<Product> findAll();
    Page<Product> findAll(Pageable pageable);
    Product findById(Long id);
    Product findByProductName(String productName);
    List<Product> findAllByCategoryId(Long categoryId);
    boolean existsById(Long id);
    void deleteById(Long id);
}
