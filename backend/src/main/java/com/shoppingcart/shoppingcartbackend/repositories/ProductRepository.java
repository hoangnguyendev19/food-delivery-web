package com.shoppingcart.shoppingcartbackend.repositories;

import com.shoppingcart.shoppingcartbackend.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Product findByProductName(String productName);
    List<Product> findAllByCategoryId(Long categoryId);
}
