package com.shoppingcart.shoppingcartbackend.services;

import com.shoppingcart.shoppingcartbackend.models.Order;

import java.util.List;

public interface IOrderService {
    Order save(Order order);
    Order findById(Long id);
    List<Order> findAllByCustomerId(Long customerId);

    void deleteById(Long id);
}
