import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false
})
export class HomeComponent implements OnInit {
  featuredProducts: any[] = [];
  currentIndex = 0;

  testimonials = [
    {
      name: 'Amythel Mediavillo',
      location: 'Manila',
      text: 'The best cheesecake I\'ve ever tasted! The Oreo cheesecake is absolutely divine - creamy, rich, and the crust is perfectly golden. Ordering again!',
      rating: 5
    },
    {
      name: 'Ana Dela Cruz',
      location: 'Cebu',
      text: 'The Biscoff cheesecake is incredible! The texture is so smooth and the flavor is out of this world. My family can\'t get enough!',
      rating: 5
    },
    {
      name: 'Sarah Johnson',
      location: 'Davao',
      text: 'Finally found a cheesecake that tastes like it\'s from a fancy bakery! The blueberry one is perfect for special occasions.',
      rating: 5
    }
  ];

  constructor(private api: ApiService, private cart: CartService) {}

  ngOnInit(): void {
    // Try backend first to mirror Product List; fallback to a small hardcoded set
    this.api.getProductCategories().subscribe({
      next: (categories: any[]) => {
        const flattened: any[] = [];
        categories.forEach((c: any) => {
          (c.products || []).forEach((p: any) => {
            flattened.push({
              id: p.id,
              name: p.name,
              price: parseFloat(p.price) || 0,
              image: p.imageFile || 'assets/products/placeholder.png',
              description: p.description,
              badge: null
            });
          });
        });
        // pick top 4
        this.featuredProducts = flattened.slice(0, 4);
      },
      error: () => {
        this.featuredProducts = [
          { id: 1, name: 'Oreo Cheesecake - Oven-Baked', price: 899, image: 'assets/products/oreo-oven-baked.png', description: 'Delicious creamy cheesecake with crushed Oreo cookies, baked to perfection in the oven', badge: 'Best Seller' },
          { id: 2, name: 'Biscoff Cheesecake - Oven-Baked', price: 999, image: 'assets/products/biscoff-oven-baked.png', description: 'Rich and creamy cheesecake with Biscoff cookie butter, oven-baked for a perfect texture', badge: 'New' },
          { id: 3, name: 'Blueberry Cheesecake - Oven-Baked', price: 799, image: 'assets/products/blueberry-oven-baked.png', description: 'Classic New York-style cheesecake with fresh blueberries, perfectly baked in the oven with a smooth and creamy texture', badge: 'Popular' },
          { id: 4, name: 'Oreo Cheesecake - No-Bake', price: 849, image: 'assets/products/oreo-no-bake.png', description: 'Creamy no-bake cheesecake with crushed Oreo cookies, chilled to perfection without baking', badge: null }
        ];
      }
    });
  }

  get currentProduct() {
    return this.featuredProducts?.[this.currentIndex];
  }

  prev(): void {
    if (!this.featuredProducts?.length) { return; }
    this.currentIndex = (this.currentIndex - 1 + this.featuredProducts.length) % this.featuredProducts.length;
  }

  next(): void {
    if (!this.featuredProducts?.length) { return; }
    this.currentIndex = (this.currentIndex + 1) % this.featuredProducts.length;
  }

  addToCart(product: any) {
    this.cart.addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image
    });
  }
}
