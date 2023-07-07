package com.shoppingcart.shoppingcartbackend.controllers;

import com.shoppingcart.shoppingcartbackend.dto.CartDTO;
import com.shoppingcart.shoppingcartbackend.dto.ItemDTO;
import com.shoppingcart.shoppingcartbackend.models.*;
import com.shoppingcart.shoppingcartbackend.services.ICartService;
import com.shoppingcart.shoppingcartbackend.services.IItemService;

import com.shoppingcart.shoppingcartbackend.services.IProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping(path = "/api/v1/carts")
public class CartController {
    private ICartService cartService;
    private IItemService itemService;
    private IProductService productService;

    public CartController(ICartService cartService, IItemService itemService, IProductService productService) {
        this.cartService = cartService;
        this.itemService = itemService;
        this.productService = productService;
    }

    public ItemDTO convertItemToItemDTO(Item item) {
        return new ItemDTO(item.getId(), item.getProduct().getImgUrl(), item.getProduct().getProductName(),
                item.getQuantity(), item.getTotalPrice(), item.getCart().getId());
    }

    public Item convertItemDTOToItem(ItemDTO itemDTO) {
        Item item = new Item();
        item.setQuantity(itemDTO.getQuantity());
        item.setTotalPrice(itemDTO.getTotalPrice());
        Cart cart = cartService.findById(itemDTO.getCartId());
        item.setCart(cart);
        Product product = productService.findByProductName(itemDTO.getProductName());
        item.setProduct(product);

        return item;
    }

    public List<ItemDTO> convertItemListToItemDTOList(List<Item> itemList) {
        List<ItemDTO> itemDTOList = new ArrayList<>();
        for(Item item: itemList) {
            itemDTOList.add(convertItemToItemDTO(item));
        }

        return itemDTOList;
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseObject> getCartItems(@PathVariable Long id) {
        try{
            Cart cart = cartService.findByCustomerId(id);
            List<Item> itemList = itemService.findAllByCartId(cart.getId());
            if(itemList != null) {
                CartDTO cartDTO = new CartDTO();
                cartDTO.setId(cart.getId());
                cartDTO.setItemList(convertItemListToItemDTOList(itemList));
                cartDTO.setTotalAmount(cart.getTotalAmount());

                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject("success", "Cart Item List", cartDTO)
                );
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                new ResponseObject("failed", "Internal server error", null)
        );
    }

    @PostMapping
    public ResponseEntity<ResponseObject> insertCartItem(@RequestBody ItemDTO itemDTO) {
        Product foundProduct = productService.findByProductName(itemDTO.getProductName());
        Item foundItem = itemService.findByCartIdAndProductId(itemDTO.getCartId(), foundProduct.getId());

        Cart foundCart = cartService.findById(itemDTO.getCartId());
        foundCart.setTotalAmount(foundCart.getTotalAmount() + itemDTO.getTotalPrice());
        cartService.save(foundCart);

        if (foundItem == null) {
            Item item = convertItemDTOToItem(itemDTO);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("success", "Insert cart item successfully", convertItemToItemDTO(itemService.save(item)))
            );
        }

        foundItem.setQuantity(foundItem.getQuantity() + itemDTO.getQuantity());
        foundItem.setTotalPrice(foundItem.getTotalPrice() + itemDTO.getTotalPrice());
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("success", "Insert cart item successfully", convertItemToItemDTO(itemService.save(foundItem)))
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseObject> deleteCartItem(@PathVariable Long id) {
        boolean exist = itemService.existsById(id);
        if(exist) {
            Item foundItem = itemService.findById(id);
            Cart foundCart = cartService.findById(foundItem.getCart().getId());
            foundCart.setTotalAmount(foundCart.getTotalAmount() - foundItem.getTotalPrice());
            cartService.save(foundCart);
            itemService.deleteById(id);
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("success", "Delete cart item successfully", null)
        );
    }
}
