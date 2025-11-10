package com.mediavillo.model;

import lombok.Data;
import java.util.List;

@Data
public class Order {
    private Integer id;

    // Customer details
    private String firstName;
    private String lastName;
    private String email;
    private String phone;

    // Shipping / billing
    private String address;
    private String city;
    private String postalCode;
    private String billingAddress;

    // Payment and extras
    private String paymentMethod;
    private String notes;
    private String shippingMethod;
    private Boolean giftWrap;
    private String deliveryDate;

    // Totals snapshot
    private Double subtotal;
    private Double discount;
    private Double shippingCost;
    private Double tax;
    private Double total;

    // Items included in order
    private List<OrderItem> items;
}
