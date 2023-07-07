package com.shoppingcart.shoppingcartbackend.security;

import com.shoppingcart.shoppingcartbackend.models.Account;
import com.shoppingcart.shoppingcartbackend.repositories.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private AccountRepository accountRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Account account = accountRepository.findByUserName(username);

        if(account==null) {
            throw new UsernameNotFoundException("User name doesn't exist");
        }
        return CustomUserDetails.mapAccountToUserDetail(account);
    }
}
