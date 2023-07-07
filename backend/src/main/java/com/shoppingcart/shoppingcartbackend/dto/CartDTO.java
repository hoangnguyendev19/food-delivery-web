package com.shoppingcart.shoppingcartbackend.dto;

import com.shoppingcart.shoppingcartbackend.models.Item;
import lombok.*;

import java.io.Serializable;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CartDTO implements Serializable {
    private Long id;
    private List<ItemDTO> itemList;
    private Double totalAmount;
}
