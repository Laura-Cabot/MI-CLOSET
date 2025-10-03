import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editor.component.html',
})
export class EditorComponent {
  products: any[] = [];
  newProduct: any = { name: '', price: 0, image: '' };

  constructor() {
    const saved = localStorage.getItem('products');
    this.products = saved ? JSON.parse(saved) : [];
  }

  save() {
    localStorage.setItem('products', JSON.stringify(this.products));
  }

  addProduct() {
    if (!this.newProduct.name || !this.newProduct.price) return;
    this.products.push({ ...this.newProduct });
    this.newProduct = { name: '', price: 0, image: '' };
    this.save();
  }

  editProduct(index: number) {
    this.newProduct = { ...this.products[index] };
    this.products.splice(index, 1);
    this.save();
  }

  deleteProduct(index: number) {
    this.products.splice(index, 1);
    this.save();
  }

  editPhotoWithAI(index: number) {
    const product = this.products[index];
    console.log("Enviando imagen a IA:", product.image);

    alert(`(Demo) Enviaríamos la foto de "${product.name}" al backend de IA.`);

  }
}
