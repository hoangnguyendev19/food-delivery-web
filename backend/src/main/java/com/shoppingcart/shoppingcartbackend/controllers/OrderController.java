package com.shoppingcart.shoppingcartbackend.controllers;

import com.shoppingcart.shoppingcartbackend.dto.OrderDTO;
import com.shoppingcart.shoppingcartbackend.dto.OrderDetailDTO;
import com.shoppingcart.shoppingcartbackend.models.*;
import com.shoppingcart.shoppingcartbackend.services.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping(path = "/api/v1/orders")
public class OrderController {

    private final IOrderService orderService;
    private final ICartService cartService;
    private final IItemService itemService;
    private final IOrderDetailService orderDetailService;
    private final ICustomerService customerService;
    private final IProductService productService;

    public OrderController(IOrderService orderService, IOrderDetailService orderDetailService,ICartService cartService,
                           IItemService itemService, ICustomerService customerService, IProductService productService) {
        this.orderService = orderService;
        this.orderDetailService = orderDetailService;
        this.cartService = cartService;
        this.itemService = itemService;
        this.customerService = customerService;
        this.productService = productService;
    }

    public OrderDetailDTO convertOrDetailToOrDetailDTO(OrderDetail orderDetail) {
        return new OrderDetailDTO(orderDetail.getId(), orderDetail.getProduct().getImgUrl(),
                orderDetail.getProduct().getProductName(), orderDetail.getQuantity(), orderDetail.getTotalPrice(),
                orderDetail.getOrder().getId());
    }

    public List<OrderDetailDTO> convertOrDetailListToOrDetailDTOList(List<OrderDetail> orDetailList) {
        List<OrderDetailDTO> orDetailDTOList = new ArrayList<>();
        for(OrderDetail orderDetail: orDetailList) {
            orDetailDTOList.add(convertOrDetailToOrDetailDTO(orderDetail));
        }

        return orDetailDTOList;
    }

    public OrderDTO convertOrderToOrderDTO(Order order) {
        return new OrderDTO(order.getId(), order.getOrderDate(), order.getTotalAmount(), order.getShippingMethod(),
                order.getPaymentMethod(), order.getStatus(), order.getCustomer().getId());
    }

    public Order convertOrderDTOToOrder(OrderDTO orderDTO) {
        Order order = new Order();
        order.setOrderDate(orderDTO.getOrderDate());
        order.setTotalAmount(orderDTO.getTotalAmount());
        order.setShippingMethod(orderDTO.getShippingMethod());
        order.setPaymentMethod(orderDTO.getPaymentMethod());
        order.setStatus(orderDTO.getStatus());
        Customer customer = customerService.findById(orderDTO.getCustomerId());
        order.setCustomer(customer);

        return order;
    }

    public List<OrderDTO> convertOrderListToOrderDTOList(List<Order> orderList) {
        List<OrderDTO> orderDTOList = new ArrayList<>();
        for(Order order: orderList) {
            orderDTOList.add(convertOrderToOrderDTO(order));
        }

        return orderDTOList;
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseObject> getAllOrderByCustomerId(@PathVariable Long id) {
        List<Order> orderList = orderService.findAllByCustomerId(id);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("success", "Order List By Customer Id", convertOrderListToOrderDTOList(orderList))
        );
    }

    @GetMapping("/{customerId}/{id}")
    public ResponseEntity<ResponseObject> getOrderDetailByOrderId(@PathVariable(value = "customerId") Long customerId,
                                                             @PathVariable(value = "id") Long orderId) {
        List<OrderDetail> orderDetailList = orderDetailService.findAllByOrderId(orderId);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("success", "Order Detail List By Order Id",
                        convertOrDetailListToOrDetailDTOList(orderDetailList))
        );
    }

    @PostMapping
    public ResponseEntity<ResponseObject> insertOrder(@RequestBody OrderDTO orderDTO) {
        Date currDate = new Date();
        orderDTO.setOrderDate(currDate);
        // Status: Processing, Shipping
        orderDTO.setStatus("processing");
        Cart cart = cartService.findById(orderDTO.getCustomerId());
        orderDTO.setTotalAmount(cart.getTotalAmount());
        Order savedOrder = orderService.save(convertOrderDTOToOrder(orderDTO));
        List<Item> itemList = itemService.findAllByCartId(cart.getId());

        for(Item item: itemList) {
            OrderDetail orderDetail = new OrderDetail();
            orderDetail.setQuantity(item.getQuantity());
            orderDetail.setTotalPrice(item.getTotalPrice());
            orderDetail.setProduct(item.getProduct());
            orderDetail.setOrder(savedOrder);

            orderDetailService.save(orderDetail);
            itemService.deleteById(item.getId());
        }

        cart.setTotalAmount(0.0);
        cartService.save(cart);

        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("success", "Insert order successfully", convertOrderToOrderDTO(savedOrder))
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseObject> updateOrderStatus(@PathVariable Long id) {
        Order order = orderService.findById(id);
        if(order != null) {
            order.setStatus("shipping");
            List<OrderDetail> orderDetailList = orderDetailService.findAllByOrderId(id);
            for(OrderDetail orderDetail: orderDetailList) {
                Product product = productService.findById(orderDetail.getProduct().getId());
                product.setQuantityInStock(product.getQuantityInStock() - orderDetail.getQuantity());
                productService.save(product);
            }
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("success", "Order exists", convertOrderToOrderDTO(orderService.save(order)))
            );
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ResponseObject("failed", "Order doesn't exist", null)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseObject> deleteOrder(@PathVariable Long id) {
        orderService.deleteById(id);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("success", "Delete order successfully", null)
        );
    }
}
