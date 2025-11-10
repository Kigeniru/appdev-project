package com.mediavillo.controller;

import com.mediavillo.entity.OrderData;
import com.mediavillo.model.Order;
import com.mediavillo.model.OrderItem;
import com.mediavillo.service.OrderItemService;
import com.mediavillo.repository.OrderDataRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@Slf4j
public class OrderController {

    @Autowired
    private OrderDataRepository orderDataRepository;

    @Autowired
    private OrderItemService orderItemService;

    @PostMapping("/api/orders")
    public ResponseEntity<?> create(@RequestBody Order order) {
        try {
            // Persist order header/details
            OrderData od = new OrderData();
            od.setFirstName(order.getFirstName());
            od.setLastName(order.getLastName());
            od.setEmail(order.getEmail());
            od.setPhone(order.getPhone());
            od.setAddress(order.getAddress());
            od.setCity(order.getCity());
            od.setPostalCode(order.getPostalCode());
            od.setBillingAddress(order.getBillingAddress());
            od.setPaymentMethod(order.getPaymentMethod());
            od.setNotes(order.getNotes());
            od.setShippingMethod(order.getShippingMethod());
            od.setGiftWrap(order.getGiftWrap());
            od.setDeliveryDate(order.getDeliveryDate());
            od.setSubtotal(order.getSubtotal());
            od.setDiscount(order.getDiscount());
            od.setShippingCost(order.getShippingCost());
            od.setTax(order.getTax());
            od.setTotal(order.getTotal());

            od = orderDataRepository.save(od);

            // Optionally persist items with generated orderId
            List<OrderItem> items = order.getItems();
            if (items != null && !items.isEmpty()) {
                for (OrderItem it : items) {
                    it.setOrderId(od.getId());
                    // propagate customer/order context into each item
                    it.setCustomerFirstName(od.getFirstName());
                    it.setCustomerLastName(od.getLastName());
                    it.setCustomerEmail(od.getEmail());
                    it.setCustomerPhone(od.getPhone());
                    it.setShippingAddress(od.getAddress());
                    it.setShippingCity(od.getCity());
                    it.setShippingPostalCode(od.getPostalCode());
                    it.setBillingAddress(od.getBillingAddress());
                    it.setPaymentMethod(od.getPaymentMethod());
                    it.setShippingMethod(od.getShippingMethod());
                    it.setGiftWrap(od.getGiftWrap());
                    it.setDeliveryDate(od.getDeliveryDate());
                }
                orderItemService.create(items);
            }

            order.setId(od.getId());
            return ResponseEntity.ok(order);
        } catch (Exception ex) {
            log.error("Failed to create order: {}", ex.getMessage(), ex);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
        }
    }
}
