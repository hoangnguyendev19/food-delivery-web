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
public class AccountDTO implements Serializable {
    private String userName;
    private Long customerId;
}
