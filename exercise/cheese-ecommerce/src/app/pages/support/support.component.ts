import { Component } from '@angular/core';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css'],
  standalone: false
})
export class SupportComponent {
  contactForm = {
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  };

  faqs = [
    {
      question: 'What makes your cheesecakes different from store-bought ones?',
      answer: 'Our cheesecakes are artisanal, handcrafted daily with premium ingredients. We use traditional baking techniques, real cream cheese, and create each cheesecake with care to ensure the perfect balance of creamy richness and golden crust.'
    },
    {
      question: 'How long do your cheesecakes stay fresh?',
      answer: 'Our cheesecakes are best enjoyed within 3-5 days of purchase when stored properly in the refrigerator. They can be frozen for up to 2 months if wrapped tightly. Always check the expiration date on your order.'
    },
    {
      question: 'How long does shipping take?',
      answer: 'Standard shipping takes 5-7 business days, express shipping takes 2-3 business days, and overnight shipping takes 1 business day. We ship nationwide across the Philippines with special packaging to keep cheesecakes fresh.'
    },
    {
      question: 'What is your return policy?',
      answer: 'Due to the perishable nature of our products, we cannot accept returns. However, if your order arrives damaged or incorrect, please contact us within 24 hours with photos and we\'ll arrange a replacement or refund.'
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Currently, we only ship within the Philippines. We\'re working on expanding our shipping to other countries soon!'
    },
    {
      question: 'How do I choose the right flavor?',
      answer: 'Browse our flavor descriptions on each product page. We offer classic favorites like Oreo, Biscoff, and Blueberry. You can also contact us for personalized recommendations based on your preferences.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept major credit/debit cards, GCash, and Cash on Delivery (COD) for select areas. Choose your preferred method at checkout.'
    },
    {
      question: 'How much is shipping?',
      answer: 'Standard shipping is free for orders ₱1,000 and up, otherwise a small fee applies. Express (₱150) and Overnight (₱300) options are also available to ensure freshness.'
    },
    {
      question: 'Can I track my order?',
      answer: 'Yes. You will receive a tracking link via email/SMS once your order is dispatched. You can also check status from the “Track Your Order” link on this page.'
    },
    {
      question: 'Can I change or cancel my order after placing it?',
      answer: 'We process orders quickly. If you need changes, contact us within 1 hour of purchase and we’ll do our best to help. Shipped orders can no longer be modified.'
    },
    {
      question: 'Do you charge VAT?',
      answer: 'All displayed prices include 12% VAT. No hidden fees at checkout, aside from optional express/overnight shipping.'
    },
    {
      question: 'What if my cheesecake arrives damaged or melted?',
      answer: 'Please contact support within 24 hours with your order number and photos. We\'ll arrange a replacement or full refund. We use special insulated packaging to maintain freshness during transit.'
    },
    {
      question: 'Are your cheesecakes suitable for dietary restrictions?',
      answer: 'We offer various options, but our cheesecakes contain dairy and gluten. Please check each product page for detailed ingredients. We\'re working on expanding our dietary-friendly options.'
    },
    {
      question: 'Do you offer discounts or promos?',
      answer: 'Yes! Subscribe to our newsletter and follow our social media for exclusive bundles, seasonal promos, special occasion discounts, and early access to new flavors.'
    }
  ];

  contactInfo = {
    email: 'support@cheesecrave.com',
    phone: '+63 2 1234 5678',
    address: '123 Bakery Lane, Makati City, Metro Manila, Philippines',
    hours: 'Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 9:00 AM - 4:00 PM\nSunday: Closed'
  };

  categories = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'product', label: 'Flavor Questions' },
    { value: 'order', label: 'Order Support' },
    { value: 'shipping', label: 'Shipping & Delivery' },
    { value: 'return', label: 'Quality Issues' },
    { value: 'custom', label: 'Custom Orders' }
  ];

  onSubmit(event?: Event) {
    if (event) {
      event.preventDefault();
    }
    console.log('Contact form submitted:', this.contactForm);
    // Handle form submission
    alert('Thank you for your message! We\'ll get back to you within 24 hours.');
    this.contactForm = { name: '', email: '', subject: '', message: '', category: 'general' };
  }

  toggleFaq(event: Event) {
    const button = event.target as HTMLElement;
    const faqItem = button.closest('.faq-item');
    if (faqItem) {
      faqItem.classList.toggle('active');
    }
  }
}
