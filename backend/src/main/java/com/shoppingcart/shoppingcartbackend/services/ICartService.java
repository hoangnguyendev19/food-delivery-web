package com.shoppingcart.shoppingcartbackend.services;

import com.shoppingcart.shoppingcartbackend.models.Cart;

public interface ICartService {
    Cart save(Cart cart);
    Cart findByCustomerId(Long customerId);
    Cart findById(Long cartId);
    void deleteById(Long id);
}
