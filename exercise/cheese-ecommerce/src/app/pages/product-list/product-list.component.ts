import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  standalone: false
})
export class ProductListComponent implements OnInit {
  constructor(private router: Router, private cart: CartService, private api: ApiService) {}

  products: any[] = [
    { id: 1, name: 'Oreo Cheesecake - Oven-Baked', price: 899, originalPrice: null, image: 'assets/products/oreo-oven-baked.png', description: 'Delicious creamy cheesecake with crushed Oreo cookies, baked to perfection in the oven', category: 'Oven-Baked', rating: 4.8, reviews: 124, badge: 'Best Seller', inStock: true },
    { id: 2, name: 'Biscoff Cheesecake - Oven-Baked', price: 999, originalPrice: null, image: 'assets/products/biscoff-oven-baked.png', description: 'Rich and creamy cheesecake with Biscoff cookie butter, oven-baked for a perfect texture', category: 'Oven-Baked', rating: 4.6, reviews: 89, badge: 'New', inStock: true },
    { id: 3, name: 'Blueberry Cheesecake - Oven-Baked', price: 799, originalPrice: null, image: 'assets/products/blueberry-oven-baked.png', description: 'Classic New York-style cheesecake with fresh blueberries, perfectly baked in the oven with a smooth and creamy texture', category: 'Oven-Baked', rating: 4.9, reviews: 156, badge: 'Popular', inStock: true },
    { id: 4, name: 'Oreo Cheesecake - No-Bake', price: 849, originalPrice: null, image: 'assets/products/oreo-no-bake.png', description: 'Creamy no-bake cheesecake with crushed Oreo cookies, chilled to perfection without baking', category: 'No-Bake', rating: 4.7, reviews: 67, badge: null, inStock: true },
    { id: 5, name: 'Biscoff Cheesecake - No-Bake', price: 949, originalPrice: null, image: 'assets/products/biscoff-no-bake.png', description: 'Delicious no-bake cheesecake with Biscoff cookie butter, chilled and ready to enjoy', category: 'No-Bake', rating: 4.5, reviews: 98, badge: null, inStock: true },
    { id: 6, name: 'Blueberry Cheesecake - No-Bake', price: 749, originalPrice: null, image: 'assets/products/blueberry-no-bake.png', description: 'Classic no-bake cheesecake with fresh blueberries, perfectly chilled with a smooth and creamy texture', category: 'No-Bake', rating: 4.8, reviews: 203, badge: null, inStock: true }
  ];
  categories: string[] = ['All', 'Oven-Baked', 'No-Bake'];
  selectedCategory = 'All';
  sortBy = 'name';
  searchTerm = '';

  filteredProducts = this.products;

  ngOnInit(): void {
    this.filteredProducts = [...this.products];
    this.sortProducts();
    // Try to load from backend; fallback to hardcoded if unreachable
    this.api.getProductCategories().subscribe({
      next: (categories: any[]) => {
        const flattened: any[] = [];
        const cats = new Set<string>();
        categories.forEach((c: any) => {
          if (c.categoryName) { cats.add(c.categoryName); }
          (c.products || []).forEach((p: any) => {
            flattened.push({
              id: p.id,
              name: p.name,
              price: parseFloat(p.price) || 0,
              originalPrice: null,
              image: p.imageFile || 'https://via.placeholder.com/300x300/E0E0E0/000000?text=Product',
              description: p.description,
              category: p.categoryName,
              rating: 5,
              reviews: 0,
              badge: null,
              inStock: true
            });
          });
        });
        if (flattened.length) {
          this.products = flattened;
          this.filteredProducts = [...this.products];
          this.categories = ['All', ...Array.from(cats)];
          this.sortProducts();
        }
      },
      error: () => {}
    });
  }

  addToCart(product: any) {
    if (!product?.inStock) { return; }
    this.cart.addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image
    });
    // Stay on the list so users can add multiple items; header count updates live
  }

  onCategoryChange(category: string) {
    this.selectedCategory = category;
    this.filterProducts();
  }

  onSortChange(sortBy: string) {
    this.sortBy = sortBy;
    this.sortProducts();
  }

  onSearchChange(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.filterProducts();
  }

  filterProducts() {
    this.filteredProducts = this.products.filter(product => {
      const matchesCategory = this.selectedCategory === 'All' || product.category === this.selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    this.sortProducts();
  }

  sortProducts() {
    this.filteredProducts.sort((a, b) => {
      switch (this.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  }
}
