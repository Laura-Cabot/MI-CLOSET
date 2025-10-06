import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { PRODUCT_DATA, Product } from '../../data/products';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.component.html',
  styles: ``,
})
export class ProductListComponent implements OnInit {
  private cartService = inject(CartService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  searchQuery: string = '';
  appliedQuery = signal<string>('');
  currentPage = signal(1);
  itemsPerPage = signal(8);
  allProducts = signal<Product[]>(PRODUCT_DATA);
  selectedCategory: string = '';

  showModal = false;
  selectedProduct: Product | null = null;

  private normalize(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  suggestions = computed(() => {
    const query = this.normalize(this.searchQuery.trim());
    if (query.length < 2) return [];
    return this.allProducts()
      .filter((p) => this.normalize(p.name).includes(query))
      .slice(0, 6)
      .map((p) => p.name);
  });

  filteredProducts = computed(() => {
    const q = this.normalize(this.appliedQuery());
    return this.allProducts().filter((product) => {
      if (this.selectedCategory && product.category !== this.selectedCategory) return false;
      if (
        q &&
        !(
          this.normalize(product.name).includes(q) ||
          this.normalize(product.description ?? '').includes(q)
        )
      )
        return false;
      return true;
    });
  });

  totalPages = computed(() => Math.ceil(this.filteredProducts().length / this.itemsPerPage()));

  paginatedProducts = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage();
    return this.filteredProducts().slice(start, start + this.itemsPerPage());
  });

  // 🔥 Escucha los cambios en los filtros (categoría o búsqueda)
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const category = params['category'] || '';
      const search = params['search'] || '';

      this.selectedCategory = category;
      if (search) this.appliedQuery.set(search);
      this.applyFilters();
    });
  }

  // --- Buscar y limpiar input ---
  onSearch() {
    this.appliedQuery.set(this.searchQuery.trim());
    this.searchQuery = '';
    this.currentPage.set(1);
  }

  onSelectSuggestion(s: string) {
    this.appliedQuery.set(s);
    this.searchQuery = '';
    this.currentPage.set(1);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) this.currentPage.set(page);
  }
  prevPage() {
    if (this.currentPage() > 1) this.currentPage.update((c) => c - 1);
  }
  nextPage() {
    if (this.currentPage() < this.totalPages()) this.currentPage.update((c) => c + 1);
  }

  // 🛒 Agregar al carrito (toast elegante)
  addToCart(product: Product) {
    if (product.stock === 0) return;
    this.cartService.addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.image,
    });

    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: `${product.name} agregado al carrito`,
      showConfirmButton: false,
      timer: 1600,
      timerProgressBar: true,
      background: '#fdfdfd',
      color: '#333',
      customClass: {
        popup: 'shadow-md rounded-lg',
        title: 'text-sm font-medium',
      },
    });

    this.closeModal();
  }

  openModal(product: Product) {
    this.selectedProduct = product;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedProduct = null;
  }

  applyFilters() {
    this.currentPage.set(1);
  }

  clearFilters() {
    this.selectedCategory = '';
    this.appliedQuery.set('');
    this.applyFilters();
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/catalogo']);
    });
  }

  // 💳 Simulación de reserva con pago inmediato
  reserveNow(product: Product) {
    if (!product || product.stock <= 0) return;

    Swal.fire({
      title: 'Procesando pago...',
      html: `<p class="text-sm text-gray-500">Por favor espera unos segundos.</p>`,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
      background: '#fff',
      color: '#333',
      customClass: {
        popup: 'rounded-xl shadow-lg',
        title: 'text-base font-semibold text-gray-800',
        htmlContainer: 'text-sm text-gray-600',
      },
    });

    setTimeout(() => {
      Swal.fire({
        icon: 'success',
        title: 'Pago exitoso 💳',
        html: `
          <p class="text-gray-700 text-sm mb-2">
            Tu reserva de <b>${product.name}</b> fue pagada correctamente.
          </p>
          <p class="text-gray-500 text-xs">
            Recibirás tu comprobante y detalles del envío en breve.
          </p>
        `,
        confirmButtonText: 'Finalizar',
        confirmButtonColor: '#22c55e',
        background: '#fff',
        color: '#333',
        customClass: {
          popup: 'rounded-xl shadow-md',
          title: 'text-base font-semibold text-gray-800',
          htmlContainer: 'text-sm text-gray-600',
        },
      });
    }, 2000);

    this.closeModal();
  }
}
