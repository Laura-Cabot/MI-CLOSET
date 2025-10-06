import { Injectable } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private storageKey = 'products';

  constructor() {
    if (!localStorage.getItem(this.storageKey)) {
      const defaultProducts: Product[] = [
        { id: 1, name: 'Camiseta Básica', price: 29.99, category: 'Ropa' },
        { id: 2, name: 'Pantalón Denim', price: 49.99, category: 'Ropa' },
        { id: 3, name: 'Zapatillas Urbanas', price: 89.99, category: 'Calzado' }
      ];
      localStorage.setItem(this.storageKey, JSON.stringify(defaultProducts));
    }
  }

  getAll(): Product[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  getById(id: number): Product | undefined {
    return this.getAll().find(p => p.id === id);
  }

  add(product: Product) {
    const products = this.getAll();
    product.id = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
    products.push(product);
    localStorage.setItem(this.storageKey, JSON.stringify(products));
  }

  update(updated: Product) {
    const products = this.getAll().map(p => p.id === updated.id ? updated : p);
    localStorage.setItem(this.storageKey, JSON.stringify(products));
  }

  delete(id: number) {
    const products = this.getAll().filter(p => p.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(products));
  }
}
