package com.mediavillo.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.mediavillo.enums.OrderItemStatus;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "order_item_data")
public class OrderItemData {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int id;
    int orderId;
    int customerId;
    String customerName;
    int productId;
    String productName;
    String productDescription;
    String productCategoryName;
    String productImageFile;
    String productUnitOfMeasure;
    double quantity;
    double price;
    OrderItemStatus status;

    // Checkout-related denormalized fields for reporting
    @Column(name = "customerFirstName")
    String customerFirstName;
    
    @Column(name = "customerLastName")
    String customerLastName;
    
    @Column(name = "customerEmail")
    String customerEmail;
    
    @Column(name = "customerPhone")
    String customerPhone;
    
    @Column(name = "shippingAddress")
    String shippingAddress;
    
    @Column(name = "shippingCity")
    String shippingCity;
    
    @Column(name = "shippingPostalCode")
    String shippingPostalCode;
    
    @Column(name = "billingAddress")
    String billingAddress;
    
    @Column(name = "paymentMethod")
    String paymentMethod;
    
    @Column(name = "shippingMethod")
    String shippingMethod;
    
    @Column(name = "giftWrap")
    Boolean giftWrap;
    
    @Column(name = "deliveryDate")
    String deliveryDate;

    @UpdateTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+08:00")
    private Date lastUpdated;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+08:00")
    private Date created;
}
