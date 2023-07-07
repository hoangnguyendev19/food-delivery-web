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
public class CustomerDTO implements Serializable {
    private Long id;
    private String photoUrl;
    private String name;
    private String gender;
    private String email;
    private Date birthday;
    private String address;
    private String phoneNumber;
}
