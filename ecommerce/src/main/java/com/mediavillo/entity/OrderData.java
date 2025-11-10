package com.mediavillo.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "order_data")
public class OrderData {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
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
    private String deliveryDate; // ISO string from UI

    // Totals snapshot
    private Double subtotal;
    private Double discount;
    private Double shippingCost;
    private Double tax;
    private Double total;

    @UpdateTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+08:00")
    private Date lastUpdated;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+08:00")
    private Date created;
}
