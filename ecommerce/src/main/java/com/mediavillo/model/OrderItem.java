package com.mediavillo.model;
import com.mediavillo.enums.OrderItemStatus;
import lombok.Data;

import java.util.*;

@Data
public class OrderItem {
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
    Date created;
    Date lastUpdated;

    // Checkout-related fields copied onto each item (for convenience/reporting)
    String customerFirstName;
    String customerLastName;
    String customerEmail;
    String customerPhone;
    String shippingAddress;
    String shippingCity;
    String shippingPostalCode;
    String billingAddress;
    String paymentMethod;
    String shippingMethod;
    Boolean giftWrap;
    String deliveryDate;
}
