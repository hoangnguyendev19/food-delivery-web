package com.shoppingcart.shoppingcartbackend.services;

import com.shoppingcart.shoppingcartbackend.models.Item;

import java.util.List;

public interface IItemService {
    Item save(Item item);
    Item findById(Long id);
    List<Item> findAllByCartId(Long cartId);
    Item findByCartIdAndProductId(Long cartId, Long productId);
    boolean existsById(Long id);
    void deleteById(Long id);
}
