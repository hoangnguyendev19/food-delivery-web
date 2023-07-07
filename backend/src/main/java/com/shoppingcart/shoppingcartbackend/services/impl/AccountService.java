package com.shoppingcart.shoppingcartbackend.services.impl;

import com.shoppingcart.shoppingcartbackend.models.Account;
import com.shoppingcart.shoppingcartbackend.repositories.AccountRepository;
import com.shoppingcart.shoppingcartbackend.services.IAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountService implements IAccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public Account save(Account account) {
        return accountRepository.save(account);
    }

    @Override
    public Account findByUserName(String userName) {
        return accountRepository.findByUserName(userName);
    }

    @Override
    public Boolean existsByUserName(String userName) {
        return accountRepository.existsByUserName(userName);
    }
}
