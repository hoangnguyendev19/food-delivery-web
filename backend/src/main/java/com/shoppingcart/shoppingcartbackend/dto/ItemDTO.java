package com.shoppingcart.shoppingcartbackend.dto;

import lombok.*;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ItemDTO implements Serializable {
    private Long id;
    private String imgUrl;
    private String productName;
    private Integer quantity;
    private Double totalPrice;
    private Long cartId;
}
