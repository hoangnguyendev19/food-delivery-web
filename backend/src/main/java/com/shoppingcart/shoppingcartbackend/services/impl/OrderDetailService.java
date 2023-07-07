package com.shoppingcart.shoppingcartbackend.services.impl;

import com.shoppingcart.shoppingcartbackend.models.Order;
import com.shoppingcart.shoppingcartbackend.models.OrderDetail;
import com.shoppingcart.shoppingcartbackend.repositories.OrderDetailRepository;
import com.shoppingcart.shoppingcartbackend.services.IOrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderDetailService implements IOrderDetailService {
    private final OrderDetailRepository orderDetailRepository;

    @Autowired
    public OrderDetailService(OrderDetailRepository orderDetailRepository) {
        this.orderDetailRepository = orderDetailRepository;
    }

    @Override
    public OrderDetail save(OrderDetail orderDetail) {
        return orderDetailRepository.save(orderDetail);
    }

    @Override
    public List<OrderDetail> findAllByOrderId(Long orderId) {
        return orderDetailRepository.findAllByOrderId(orderId);
    }
}
