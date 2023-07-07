package com.shoppingcart.shoppingcartbackend.models;

import com.shoppingcart.shoppingcartbackend.dto.ProductDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PageObject {
    private Integer page;
    private Integer totalPage;
    private List<ProductDTO> productList;
}
