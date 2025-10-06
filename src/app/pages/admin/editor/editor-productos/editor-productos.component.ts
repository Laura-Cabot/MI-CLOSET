import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-editor-productos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './editor-productos.component.html',
})
export class EditorProductosComponent {
  products: any[] = [];
  newProduct: any = { name: '', price: null, image: '' };

  constructor(private router: Router) {
    const saved = localStorage.getItem('products');
    this.products = saved ? JSON.parse(saved) : [];
  }

  save() {
    localStorage.setItem('products', JSON.stringify(this.products));
  }

  addProduct() {
    if (!this.newProduct.name || !this.newProduct.price || !this.newProduct.image) return;

    this.products.push({ ...this.newProduct });
    this.save();
    this.newProduct = { name: '', price: null, image: '' };
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

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.newProduct.image = reader.result; // Imagen en base64
      };
      reader.readAsDataURL(file);
    }
  }

  goBackToDashboard() {
    this.router.navigate(['/admin']);
  }
}
