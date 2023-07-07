package com.shoppingcart.shoppingcartbackend.repositories;

import com.shoppingcart.shoppingcartbackend.models.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
//    @Query()
    List<Item> findAllByCartId(Long cartId);
    Item findByCartIdAndProductId(Long cartId, Long productId);
}
