package com.shoppingcart.shoppingcartbackend.services;

import com.shoppingcart.shoppingcartbackend.models.Account;

public interface IAccountService {
    Account save(Account account);
    Account findByUserName(String userName);
    Boolean existsByUserName(String userName);
}
