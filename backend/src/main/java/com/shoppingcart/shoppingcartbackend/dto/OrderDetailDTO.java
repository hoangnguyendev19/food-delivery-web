package com.shoppingcart.shoppingcartbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class OrderDetailDTO implements Serializable {
    private Long id;
    private String imgUrl;
    private String productName;
    private Integer quantity;
    private Double totalPrice;
    private Long orderId;
}
