package com.shoppingcart.shoppingcartbackend.models;

import com.shoppingcart.shoppingcartbackend.enums.ERole;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.Table;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "Role")
public class Role extends BaseObject{
    @Column(name = "role_name")
    @Enumerated
    private ERole roleName;
}
