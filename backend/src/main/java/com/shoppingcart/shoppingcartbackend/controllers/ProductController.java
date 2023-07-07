package com.shoppingcart.shoppingcartbackend.controllers;

import com.shoppingcart.shoppingcartbackend.dto.ProductDTO;
import com.shoppingcart.shoppingcartbackend.models.Category;
import com.shoppingcart.shoppingcartbackend.models.PageObject;
import com.shoppingcart.shoppingcartbackend.models.Product;
import com.shoppingcart.shoppingcartbackend.models.ResponseObject;
import com.shoppingcart.shoppingcartbackend.services.ICategoryService;
import com.shoppingcart.shoppingcartbackend.services.IProductService;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping(path = "/api/v1/products")
public class ProductController {
    private IProductService productService;
    private ICategoryService categoryService;

    public ProductController(IProductService productService, ICategoryService categoryService) {
        this.productService = productService;
        this.categoryService = categoryService;
    }

    public ProductDTO convertProductToProductDTO(Product product) {
        return new ProductDTO(product.getId(), product.getProductName(), product.getDescription(), product.getImgUrl(),
                product.getPrice(), product.getQuantityInStock(), product.getCategory().getCategoryName());
    }

    public Product convertProductDTOToProduct(ProductDTO productDTO) {
        Product product = new Product();
        product.setProductName(productDTO.getProductName());
        product.setDescription(productDTO.getDescription());
        product.setImgUrl(productDTO.getImgUrl());
        product.setPrice(productDTO.getPrice());
        product.setQuantityInStock(productDTO.getQuantityInStock());
        Category category = categoryService.findByCategoryName(productDTO.getCategoryName());
        product.setCategory(category);

        return product;
    }

    public List<ProductDTO> convertProductListToProductDTOList(List<Product> productList) {
        List<ProductDTO> productDTOList = new ArrayList<>();
        for(Product product: productList) {
            productDTOList.add(convertProductToProductDTO(product));
        }

        return productDTOList;
    }

    @GetMapping
    public ResponseEntity<ResponseObject> getAllProducts(@RequestParam(value = "category", required = false) String category,
                                                         @RequestParam(value = "page", required = false) Integer page,
                                                         @RequestParam(value = "limit", required = false) Integer limit,
                                                         @RequestParam(value = "sort", required = false) String sort) {
        PageObject pageObject = new PageObject();
        pageObject.setPage(0);
        pageObject.setTotalPage(0);
        try{
            if(category != null) {
                Long categoryId = categoryService.findByCategoryName(category) != null ? categoryService.findByCategoryName(category).getId(): -1;
                if(categoryId < 1) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                            new ResponseObject("failed", "Category doesn't exist", null)
                    );
                }
                pageObject.setProductList(convertProductListToProductDTOList(productService.findAllByCategoryId(categoryId)));
                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject("success", "Product List By Category", pageObject)
                );
            }

            if(page != null && limit != null) {
                Pageable pageable = null;
                if(sort != null) {
                    String[] sortParams = sort.split(",");
                    Sort.Direction direction = Sort.Direction.ASC;

                    if(sortParams.length > 1 && sortParams[1].equalsIgnoreCase("desc")) {
                        direction = Sort.Direction.DESC;
                    }
                    pageable = PageRequest.of(page - 1, limit, Sort.by(direction, sortParams[0]));
                } else {
                    pageable = PageRequest.of(page - 1, limit);
                }
                Page<Product> productPage = productService.findAll(pageable);
                pageObject.setPage(productPage.getNumber() + 1);
                pageObject.setTotalPage(productPage.getTotalPages());
                pageObject.setProductList(convertProductListToProductDTOList(productPage.getContent()));

                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject("success", "Product List By Page", pageObject)
                );
            }
            pageObject.setProductList(convertProductListToProductDTOList(productService.findAll()));
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("success", "Product List", pageObject)
            );
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                new ResponseObject("failed", "Internal server error", null)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseObject> getProductById(@PathVariable Long id) {
        Product foundProduct = productService.findById(id);

        if (foundProduct != null) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("success", "Product " + id + " exists", convertProductToProductDTO(foundProduct))
            );
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("failed", "Product " + id + " doesn't exist", null)
            );
        }

    }

    @PostMapping
    public ResponseEntity<ResponseObject> insertProduct(@RequestBody ProductDTO productDTO) {
        Product foundProduct = productService.findByProductName(productDTO.getProductName().trim());
        Category foundCategory = categoryService.findByCategoryName(productDTO.getCategoryName());

        if(foundProduct != null) {
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                    new ResponseObject("failed", "Product name exists", null)
            );
        }

        if(foundCategory != null) {
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                    new ResponseObject("failed", "Category doesn't exist", null)
            );
        }
        productService.save(convertProductDTOToProduct(productDTO));
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("success", "Insert product successfully", productDTO)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseObject> updateProduct(@RequestBody Product newProduct, @PathVariable Long id) {
        Product foundProduct = productService.findById(id);
        if(foundProduct != null) {
            foundProduct.setProductName(newProduct.getProductName());
            foundProduct.setDescription(newProduct.getDescription());
            foundProduct.setImgUrl(newProduct.getImgUrl());
            foundProduct.setPrice(newProduct.getPrice());
            foundProduct.setQuantityInStock(newProduct.getQuantityInStock());

            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("success", "Update product successfully", convertProductToProductDTO(productService.save(foundProduct)))
            );
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("success", "Insert product successfully", convertProductToProductDTO(productService.save(newProduct)))
            );
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseObject> deleteProduct(@PathVariable Long id) {
        boolean exist = productService.existsById(id);
        if(exist) {
            productService.deleteById(id);
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("success", "delete product successfully", null)
        );
    }
}
