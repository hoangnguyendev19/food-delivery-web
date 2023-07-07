package com.shoppingcart.shoppingcartbackend.controllers;

import com.shoppingcart.shoppingcartbackend.dto.CustomerDTO;
import com.shoppingcart.shoppingcartbackend.models.Account;
import com.shoppingcart.shoppingcartbackend.models.Customer;
import com.shoppingcart.shoppingcartbackend.models.ResponseObject;
import com.shoppingcart.shoppingcartbackend.services.IAccountService;
import com.shoppingcart.shoppingcartbackend.services.ICustomerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping(path = "/api/v1/profile")
public class CustomerController {
    private final ICustomerService customerService;
    private final IAccountService accountService;

    public CustomerController(ICustomerService customerService, IAccountService accountService) {
        this.customerService = customerService;
        this.accountService = accountService;
    }

    public CustomerDTO convertCustomerToCustomerDTO(Customer customer) {
        return new CustomerDTO(customer.getId(), customer.getPhotoUrl(), customer.getName(), customer.getGender(),
                customer.getEmail(), customer.getBirthday(), customer.getAddress(), customer.getPhoneNumber());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseObject> getProfile(@PathVariable Long id) {
        Customer customer = customerService.findById(id);
        if(customer != null) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("success", "Your profile", convertCustomerToCustomerDTO(customer))
            );
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ResponseObject("failed", "Your profile doesn't exist", null)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseObject> updateProfile(@RequestBody CustomerDTO customerDTO, @PathVariable Long id) {
        Customer customer = customerService.findById(id);
        if(customer == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("failed", "Customer doesn't exist", null)
            );
        }
        if(customerDTO.getPhotoUrl() != null) {
            customer.setPhotoUrl(customerDTO.getPhotoUrl());
        }
        if(customerDTO.getName() != null) {
            customer.setName(customerDTO.getName());
        }
        if(customerDTO.getEmail() != null) {
            customer.setEmail(customerDTO.getEmail());
        }
        if(customerDTO.getGender() != null) {
            customer.setGender(customerDTO.getGender());
        }
        if(customerDTO.getBirthday() != null) {
            customer.setBirthday(customerDTO.getBirthday());
        }
        if(customerDTO.getAddress() != null) {
            customer.setAddress(customerDTO.getAddress());
        }
        if(customerDTO.getPhoneNumber() != null) {
            customer.setPhoneNumber(customerDTO.getPhoneNumber());
        }

        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("success", "Update profile successfully", convertCustomerToCustomerDTO(customerService.save(customer)))
        );
    }
}
