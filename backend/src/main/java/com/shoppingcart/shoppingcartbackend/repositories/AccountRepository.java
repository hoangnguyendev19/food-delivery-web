package com.shoppingcart.shoppingcartbackend.repositories;

import com.shoppingcart.shoppingcartbackend.models.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    Account findByUserName(String userName);
    boolean existsByUserName(String userName);
}
