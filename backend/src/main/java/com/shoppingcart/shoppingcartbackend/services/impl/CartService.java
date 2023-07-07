package com.shoppingcart.shoppingcartbackend.services.impl;

import com.shoppingcart.shoppingcartbackend.models.Cart;
import com.shoppingcart.shoppingcartbackend.repositories.CartRepository;
import com.shoppingcart.shoppingcartbackend.services.ICartService;
import org.springframework.stereotype.Service;

@Service
public class CartService implements ICartService {
    private final CartRepository cartRepository;

    public CartService(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    @Override
    public Cart save(Cart cart) {
        return cartRepository.save(cart);
    }

    @Override
    public Cart findByCustomerId(Long customerId) {
        return cartRepository.findByCustomerId(customerId);
    }

    @Override
    public Cart findById(Long cartId) {
        return cartRepository.findById(cartId).get();
    }

    @Override
    public void deleteById(Long id) {
        cartRepository.deleteById(id);
    }
}
