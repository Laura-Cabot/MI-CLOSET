import { Component, computed, inject, signal, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { PRODUCT_DATA, Product } from '../../data/products';
import Swal from 'sweetalert2';

// Añadimos OnPush para trabajar de forma más eficiente en Zoneless, aunque no es obligatorio.
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush, // Opcional, pero bueno para Zoneless
})
export class ProductListComponent implements OnInit {
  private cartService = inject(CartService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef); // 🔑 INYECCIÓN CLAVE

  searchQuery: string = '';
  appliedQuery = signal<string>('');
  currentPage = signal(1);
  itemsPerPage = signal(8);
  allProducts = signal<Product[]>(PRODUCT_DATA);
  selectedCategory: string = '';

  showModal = false;
  selectedProduct: Product | null = null;

  // 🏷️ Categorías automáticas
  categories: string[] = Array.from(
    new Set(PRODUCT_DATA.map((p) => p.category).filter((c) => !!c))
  );

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
      // FILTRO POR CATEGORÍA
      if (this.selectedCategory && product.category !== this.selectedCategory)
        return false;
      
      // FILTRO POR BÚSQUEDA
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

  totalPages = computed(() =>
    Math.ceil(this.filteredProducts().length / this.itemsPerPage())
  );

  paginatedProducts = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage();
    return this.filteredProducts().slice(start, start + this.itemsPerPage());
  });

  // 🔑 NG ON INIT CLAVE
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const category = params['category'] || '';
      const search = params['search'] || '';
      
      this.selectedCategory = category;
      if (search) this.appliedQuery.set(search);
      
      this.applyFilters();
      
      // 🚨 MÁS CLAVE AÚN: En Zoneless, forzamos la actualización de la vista.
      this.cdr.detectChanges(); 
    });
  }

  // 🔍 Buscar
  onSearch() {
    const query = this.searchQuery.trim();
    this.appliedQuery.set(query);
    this.searchQuery = '';
    this.currentPage.set(1);
    
    this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { search: query || null, category: null }, 
        replaceUrl: true, 
    });
  }

  onSelectSuggestion(s: string) {
    this.appliedQuery.set(s);
    this.searchQuery = '';
    this.currentPage.set(1);
    
    this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { search: s || null, category: null }, 
        replaceUrl: true,
    });
  }

  // 📂 Filtrar por categoría
 // product-list.component.ts

// ...

  // 📂 Filtrar por categoría (¡Solución aplicando la misma lógica del Nav!)
  filterByCategory(category: string) {
    this.selectedCategory = category;
    this.appliedQuery.set(''); 
    this.currentPage.set(1);
    
    // 🔑 CLAVE: Forzamos una navegación a una ruta neutra y luego a la destino.
    // Esto obliga al componente a reaccionar, imitando el comportamiento del Nav.
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/catalogo'], { 
        queryParams: { category: category, search: null },
        replaceUrl: true
      });
    });
  }

// ...

  // 🔄 Filtros (Mantiene la función para resetear la paginación)
  applyFilters() {
    this.currentPage.set(1);
  }

  clearFilters() {
    this.selectedCategory = '';
    this.appliedQuery.set('');
    this.applyFilters();
    
    this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { category: null, search: null },
        replaceUrl: true,
    });
  }
  
  // 🧭 Paginación, Carrito, Reservar... (resto del código)

  prevPage() {
    if (this.currentPage() > 1) this.currentPage.update((c) => c - 1);
  }
  nextPage() {
    if (this.currentPage() < this.totalPages())
      this.currentPage.update((c) => c + 1);
  }

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

  reserveNow(product: Product) {
    if (!product || product.stock <= 0) return;

    Swal.fire({
      title: 'Procesando pago...',
      html: `<p class="text-sm text-gray-500">Por favor espera unos segundos.</p>`,
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    setTimeout(() => {
      Swal.fire({
        icon: 'success',
        title: 'Pago exitoso 💳',
        html: `<p class="text-gray-700 text-sm mb-2">
            Tu reserva de <b>${product.name}</b> fue pagada correctamente.
          </p>
          <p class="text-gray-500 text-xs">
            Recibirás tu comprobante y detalles del envío en breve.
          </p>`,
        confirmButtonText: 'Finalizar',
        confirmButtonColor: '#22c55e',
      });
    }, 2000);

    this.closeModal();
  }
}