package com.shoppingcart.shoppingcartbackend.controllers;

import com.shoppingcart.shoppingcartbackend.dto.AccountDTO;
import com.shoppingcart.shoppingcartbackend.dto.PasswordDTO;
import com.shoppingcart.shoppingcartbackend.models.Account;
import com.shoppingcart.shoppingcartbackend.models.Cart;
import com.shoppingcart.shoppingcartbackend.models.Customer;
import com.shoppingcart.shoppingcartbackend.models.ResponseObject;
import com.shoppingcart.shoppingcartbackend.services.IAccountService;
import com.shoppingcart.shoppingcartbackend.services.ICartService;
import com.shoppingcart.shoppingcartbackend.services.ICustomerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping(path = "/api/v1/accounts")
public class AccountController {

    private final IAccountService accountService;
    private final ICustomerService customerService;
    private final ICartService cartService;

    public AccountController(IAccountService accountService, ICustomerService customerService, ICartService cartService) {
        this.accountService = accountService;
        this.customerService = customerService;
        this.cartService = cartService;
    }

    public AccountDTO convertAccountToAccountDTO(Account account) {
        return new AccountDTO(account.getUserName(), account.getCustomer().getId());
    }

    @PostMapping("/login")
    public ResponseEntity<ResponseObject> login(@RequestBody Account account) {
        Account foundAccount = accountService.findByUserName(account.getUserName());
        if(foundAccount != null) {
            if(!foundAccount.getPassword().equalsIgnoreCase(account.getPassword())) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ResponseObject("failed", "Password incorrect", null)
                );
            } else {
                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject("success", "Login successfully", convertAccountToAccountDTO(foundAccount))
                );
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("failed", "User name doesn't exist", null)
            );
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<ResponseObject> logout(@RequestBody Account account) {
        Account foundAccount = accountService.findByUserName(account.getUserName());
        if(foundAccount != null) {
            return ResponseEntity.status(HttpStatus.FOUND).body(
                    new ResponseObject("failed", "User name exist", null)
            );
        }
        Customer customer = new Customer();
        Customer newCustomer = customerService.save(customer);
        Cart cart = new Cart();
        cart.setTotalAmount(0.0);
        cart.setCustomer(newCustomer);
        cartService.save(cart);
        account.setCustomer(newCustomer);
        account.setRole("user");
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("success", "Sign up successfully", convertAccountToAccountDTO(accountService.save(account)))
        );
    }

    @PutMapping("/password")
    public ResponseEntity<ResponseObject> updatePassword(@RequestBody PasswordDTO passwordDTO) {
        Account foundAccount = accountService.findByUserName(passwordDTO.getUserName());
        if(foundAccount == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("failed", "User name doesn't exist", null)
            );
        }
        if(!foundAccount.getPassword().equals(passwordDTO.getOldPassword())) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("failed", "Password incorrect", null)
            );
        }
        foundAccount.setPassword(passwordDTO.getNewPassword());
        accountService.save(foundAccount);

        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("success", "Update password successfully", null)
        );
    }
}
