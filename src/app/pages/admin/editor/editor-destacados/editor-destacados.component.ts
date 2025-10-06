import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  imageUrl: string;
  featured: boolean;
}

const STORAGE_KEY = 'mc_products';

@Component({
  selector: 'app-editor-destacados',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './editor-destacados.component.html',
})
export class EditorDestacadosComponent implements OnInit {
  products: Product[] = [];
  search = '';
  newProduct: Partial<Product> = {};

  ngOnInit() {
    this.load();
  }

  load() {
    const data = localStorage.getItem(STORAGE_KEY);
    this.products = data ? JSON.parse(data) : [];
  }

  save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.products));
  }

  destacados() {
    return this.products.filter(p => p.featured);
  }

  noDestacados() {
    return this.products.filter(p => !p.featured);
  }

  filteredNonFeatured() {
    const t = this.search.toLowerCase().trim();
    const list = this.noDestacados();
    if (!t) return list;
    return list.filter(p =>
      (p.name + p.category).toLowerCase().includes(t)
    );
  }

  toggleDestacado(p: Product) {
    const destacados = this.destacados();
    if (!p.featured && destacados.length >= 3) {
      alert('Solo podés tener 3 productos destacados.');
      return;
    }
    p.featured = !p.featured;
    this.save();
  }

  deleteProduct(p: Product) {
    if (!confirm(`¿Eliminar "${p.name}"?`)) return;
    this.products = this.products.filter(x => x.id !== p.id);
    this.save();
  }

  // 🆕 Crear producto nuevo desde el formulario
  createProduct() {
    if (!this.newProduct.name || !this.newProduct.imageUrl) {
      alert('Completá nombre e imagen.');
      return;
    }

    const newP: Product = {
      id: crypto.randomUUID(),
      name: this.newProduct.name!,
      category: this.newProduct.category || 'Sin categoría',
      price: Number(this.newProduct.price) || 0,
      stock: Number(this.newProduct.stock) || 0,
      imageUrl: this.newProduct.imageUrl!,
      featured: false,
    };

    this.products.unshift(newP);
    this.save();
    this.newProduct = {};
    alert('Producto agregado ✅');
  }
}
