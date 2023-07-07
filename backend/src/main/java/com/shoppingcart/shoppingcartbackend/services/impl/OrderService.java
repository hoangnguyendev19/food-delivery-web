package com.shoppingcart.shoppingcartbackend.services.impl;

import com.shoppingcart.shoppingcartbackend.models.Order;
import com.shoppingcart.shoppingcartbackend.repositories.OrderRepository;
import com.shoppingcart.shoppingcartbackend.services.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService implements IOrderService {
    private final OrderRepository orderRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    public Order save(Order order) {
        return orderRepository.save(order);
    }

    @Override
    public Order findById(Long id) {
        return orderRepository.findById(id).isPresent() ? orderRepository.findById(id).get() : null;
    }

    @Override
    public List<Order> findAllByCustomerId(Long customerId) {
        return orderRepository.findAllByCustomerId(customerId);
    }

    @Override
    public void deleteById(Long id) {
        orderRepository.deleteById(id);
    }
}
