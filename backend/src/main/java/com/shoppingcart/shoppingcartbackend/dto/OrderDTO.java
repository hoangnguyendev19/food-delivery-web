package com.shoppingcart.shoppingcartbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class OrderDTO implements Serializable {
    private Long id;
    private Date orderDate;
    private Double totalAmount;
    private String shippingMethod;
    private String paymentMethod;
    private String status;
    private Long customerId;
}
