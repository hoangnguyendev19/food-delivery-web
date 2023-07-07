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
public class PasswordDTO implements Serializable {
    private String userName;
    private String oldPassword;
    private String newPassword;
}
