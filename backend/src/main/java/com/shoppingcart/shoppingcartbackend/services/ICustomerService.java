package com.shoppingcart.shoppingcartbackend.services;

import com.shoppingcart.shoppingcartbackend.models.Customer;

public interface ICustomerService {
    Customer save(Customer customer);
    Customer findById(Long id);
}
