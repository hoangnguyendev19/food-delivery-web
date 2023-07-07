package com.shoppingcart.shoppingcartbackend.services.impl;

import com.shoppingcart.shoppingcartbackend.models.Product;
import com.shoppingcart.shoppingcartbackend.repositories.ProductRepository;
import com.shoppingcart.shoppingcartbackend.services.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService implements IProductService {

    private ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public Product save(Product product) {
        return productRepository.save(product);
    }

    @Override
    public List<Product> findAll() {
        return productRepository.findAll();
    }

    @Override
    public Page<Product> findAll(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    @Override
    public Product findById(Long id) {
        return productRepository.findById(id).isPresent() ? productRepository.findById(id).get() : null;
    }

    public Product findByProductName(String productName) {
        return productRepository.findByProductName(productName);
    }

    public List<Product> findAllByCategoryId(Long categoryId) {
        return productRepository.findAllByCategoryId(categoryId);
    }

    public boolean existsById(Long id) {
        return productRepository.existsById(id);
    }

    public void deleteById(Long id) {
        productRepository.deleteById(id);
    }
}
