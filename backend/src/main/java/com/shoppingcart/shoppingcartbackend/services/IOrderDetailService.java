package com.shoppingcart.shoppingcartbackend.services;

import com.shoppingcart.shoppingcartbackend.models.OrderDetail;

import java.util.List;

public interface IOrderDetailService {
    OrderDetail save(OrderDetail orderDetail);
    List<OrderDetail> findAllByOrderId(Long orderId);
}
