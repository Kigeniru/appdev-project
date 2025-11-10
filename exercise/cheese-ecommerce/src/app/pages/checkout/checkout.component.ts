import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService, CartItem } from '../../services/cart.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  standalone: false
})
export class CheckoutComponent implements OnInit {
  orderForm = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'credit-card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingAddress: '',
    notes: ''
  };

  cartItems: CartItem[] = [];

  shippingMethods = [
    { id: 'standard', name: 'Standard Shipping', price: 0, days: '5-7 business days' },
    { id: 'express', name: 'Express Shipping', price: 150, days: '2-3 business days' },
    { id: 'overnight', name: 'Overnight Shipping', price: 300, days: '1 business day' }
  ];

  selectedShipping = 'standard';
  isProcessing = false;
  couponCode = '';
  giftWrap = false;
  deliveryDate: string | null = null;

  constructor(private cart: CartService, private router: Router, private api: ApiService) {}

  ngOnInit(): void {
    this.cartItems = this.cart.getItems();
  }

  get subtotal() {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  get shippingCost() {
    const method = this.shippingMethods.find(m => m.id === this.selectedShipping);
    return method ? method.price : 0;
  }

  get tax() {
    return Math.round(this.subtotal * 0.12); // 12% VAT
  }

  get discount() {
    // Simple promo: CHEESE10 gives 10% off subtotal (before tax/shipping)
    return this.couponCode.trim().toUpperCase() === 'CHEESE10' ? Math.round(this.subtotal * 0.10) : 0;
  }

  get total() {
    const giftWrapFee = this.giftWrap ? 50 : 0;
    return this.subtotal - this.discount + this.shippingCost + this.tax + giftWrapFee;
  }

  onSubmit() {
    if (this.cartItems.length === 0) { return; }
    this.isProcessing = true;
    const customerId = 1; // demo user
    const items = this.cartItems.map(i => ({
      id: 0,
      orderId: 0,
      customerId,
      customerName: `${this.orderForm.firstName} ${this.orderForm.lastName}`.trim() || 'Guest',
      productId: i.id,
      productName: i.name,
      productDescription: '',
      productCategoryName: '',
      productImageFile: i.image,
      productUnitOfMeasure: 'piece',
      quantity: i.quantity,
      price: i.price,
      status: 'Ordered'
    }));

    const orderPayload: any = {
      ...this.orderForm,
      shippingMethod: this.selectedShipping,
      giftWrap: this.giftWrap,
      deliveryDate: this.deliveryDate,
      subtotal: this.subtotal,
      discount: this.discount,
      shippingCost: this.shippingCost,
      tax: this.tax,
      total: this.total,
      items
    };

    this.api.createOrder(orderPayload).subscribe({
      next: (created) => {
        this.isProcessing = false;
        this.cart.clear();
        window.alert('Order placed! Thank you for your purchase.');
        this.router.navigate(['/']);
      },
      error: () => {
        this.isProcessing = false;
        window.alert('Failed to place order. Please try again.');
      }
    });
  }

  updateQuantity(itemId: number, change: number) {
    const item = this.cartItems.find(i => i.id === itemId);
    if (!item) { return; }
    const newQty = Math.max(1, item.quantity + change);
    item.quantity = newQty;
    this.cart.updateQuantity(itemId, newQty);
  }

  removeItem(itemId: number) {
    this.cartItems = this.cartItems.filter(item => item.id !== itemId);
    this.cart.removeItem(itemId);
  }
}
