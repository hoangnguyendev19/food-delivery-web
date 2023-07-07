package com.shoppingcart.shoppingcartbackend.dto;

import lombok.*;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ProductDTO implements Serializable {
    private Long id;
    private String productName;
    private String description;
    private String imgUrl;
    private Double price;
    private Integer quantityInStock;
    private String categoryName;
}
