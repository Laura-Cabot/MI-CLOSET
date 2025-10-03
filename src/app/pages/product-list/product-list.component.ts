import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { PRODUCT_DATA, Product, SelectedOptions } from '../../data/products';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.component.html',
  styles: ``
})
export class ProductListComponent implements OnInit {
  private cartService = inject(CartService); 
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  currentPage = signal(1);
  itemsPerPage = signal(8);
  allProducts = signal<Product[]>(PRODUCT_DATA);

  selectedCategory: string = '';
  selectedSize: string = '';
  selectedColor: string = '';

  showModal = false;
  selectedProduct: Product | null = null;

  // 🔹 Mapeo de colores a valores CSS (para que se pinten)
  colorMap: { [key: string]: string } = {
    'Negro': '#000000',
    'Blanco': '#FFFFFF',
    'Gris': '#808080',
    'Azul Claro': '#87CEEB',
    'Azul Oscuro': '#00008B',
    'Rojo': '#FF0000',
    'Verde': '#008000',
    'Rosado': '#FFC0CB',
    'Dorado': '#FFD700',
    'Marrón': '#8B4513',
    'Beige': '#F5F5DC',
    'Amarillo': '#FFFF00',
    // fallback
    'default': '#ccc'
  };

  selectedOptions: SelectedOptions = this.allProducts().reduce((acc, product) => {
    const isAccessory = !product.isApparel;
    acc[product.id] = { 
      size: isAccessory ? 'T.U.' : '', 
      color: isAccessory ? (product.colors[0] || '') : '' 
    };
    return acc;
  }, {} as SelectedOptions);

  filteredProducts = computed(() => {
    const q = (this.route.snapshot.queryParams['search'] ?? '').toLowerCase();

    return this.allProducts().filter(product => {
      if (this.selectedCategory && product.category !== this.selectedCategory) return false;
      if (this.selectedSize && product.isApparel && !product.sizes.includes(this.selectedSize)) return false;
      if (this.selectedColor && !product.colors.includes(this.selectedColor)) return false;

      if (q && !(product.name.toLowerCase().includes(q) || product.description.toLowerCase().includes(q))) {
        return false;
      }
      return true;
    });
  });

  totalPages = computed(() => Math.ceil(this.filteredProducts().length / this.itemsPerPage()));
  paginatedProducts = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage();
    return this.filteredProducts().slice(start, start + this.itemsPerPage());
  });

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.selectedCategory = params['category'];
        this.applyFilters();
      }
    });
  }

  goToPage(page: number) { if (page >= 1 && page <= this.totalPages()) this.currentPage.set(page); }
  prevPage() { if (this.currentPage() > 1) this.currentPage.update(c => c - 1); }
  nextPage() { if (this.currentPage() < this.totalPages()) this.currentPage.update(c => c + 1); }

  canAddToCart(product: Product): boolean {
    const options = this.selectedOptions[product.id];
    if (product.stock === 0) return false;
    if (product.isApparel) return options.size !== '' && options.color !== '';
    return options.color !== '';
  }

  selectSize(productId: number, size: string) { this.selectedOptions[productId].size = size; }
  selectColor(productId: number, color: string) { this.selectedOptions[productId].color = color; }

  addToCart(product: Product) {
    if (!this.canAddToCart(product)) return;
    const { size, color } = this.selectedOptions[product.id];
    this.cartService.addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.image,
      size,
      color
    });
    this.closeModal();
  }

  // Modal
  openModal(product: Product) {
    this.selectedProduct = product;
    this.showModal = true;
  }
  closeModal() {
    this.showModal = false;
    this.selectedProduct = null;
  }

  applyFilters() { this.currentPage.set(1); }
  clearFilters() {
    this.selectedCategory = '';
    this.selectedSize = '';
    this.selectedColor = '';
    this.applyFilters();
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/catalogo']);
    });
  }
}

