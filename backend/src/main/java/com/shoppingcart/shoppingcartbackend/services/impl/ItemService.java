package com.shoppingcart.shoppingcartbackend.services.impl;

import com.shoppingcart.shoppingcartbackend.models.Item;
import com.shoppingcart.shoppingcartbackend.repositories.ItemRepository;
import com.shoppingcart.shoppingcartbackend.services.IItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ItemService implements IItemService {
    private final ItemRepository itemRepository;

    @Autowired
    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    @Override
    public Item save(Item item) {
        return itemRepository.save(item);
    }

    @Override
    public Item findById(Long id) {
        return itemRepository.findById(id).get();
    }

    @Override
    public List<Item> findAllByCartId(Long cartId) {
        return itemRepository.findAllByCartId(cartId);
    }

    @Override
    public Item findByCartIdAndProductId(Long cartId, Long productId) {
        return itemRepository.findByCartIdAndProductId(cartId, productId);
    }

    @Override
    public boolean existsById(Long id) {
        return itemRepository.existsById(id);
    }

    @Override
    public void deleteById(Long id) {
        itemRepository.deleteById(id);
    }
}
