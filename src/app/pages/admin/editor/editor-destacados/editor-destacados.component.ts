import { Component, signal, OnInit, computed } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectionStrategy } from '@angular/core';

// --- INTERFACES ---
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  imageUrl: string;
  featured: boolean;
}

interface ConfirmModal {
  isOpen: boolean;
  message: string;
  productToDelete: Product | null;
}

const STORAGE_KEY = 'mc_products_simple';

// Datos de prueba para simular un catálogo grande (Cientos de productos)
const MOCK_PRODUCTS: Product[] = [
  { id: 'p1', name: 'Vestido Flor Morada', category: 'Vestidos', price: 59.99, stock: 12, imageUrl: 'https://placehold.co/100x100/fecaca/9f1233?text=VF', featured: true },
  { id: 'p2', name: 'Botines Negros T-38', category: 'Calzado', price: 120.00, stock: 5, imageUrl: 'https://placehold.co/100x100/bfdbfe/1d4ed8?text=BN', featured: true },
  { id: 'p3', name: 'Jeans Slim Fit', category: 'Pantalones', price: 85.50, stock: 20, imageUrl: 'https://placehold.co/100x100/d1fae5/065f46?text=JSF', featured: true },
  { id: 'p4', name: 'Chaqueta de Cuero', category: 'Abrigos', price: 299.99, stock: 3, imageUrl: 'https://placehold.co/100x100/fee2e2/991b1b?text=CC', featured: false },
  { id: 'p5', name: 'Gafas de Sol Clásicas', category: 'Accesorios', price: 35.00, stock: 50, imageUrl: 'https://placehold.co/100x100/e0f2f1/0f766e?text=GSC', featured: false },
  { id: 'p6', name: 'Bufanda de Lana', category: 'Accesorios', price: 19.99, stock: 0, imageUrl: 'https://placehold.co/100x100/fff7ed/b45309?text=BL', featured: false },
  { id: 'p7', name: 'Blusa Seda Roja', category: 'Camisas', price: 45.00, stock: 8, imageUrl: 'https://placehold.co/100x100/fce7f3/9d174d?text=BSR', featured: false },
  { id: 'p8', name: 'Shorts Deportivos', category: 'Pantalones', price: 30.00, stock: 15, imageUrl: 'https://placehold.co/100x100/eef2ff/4338ca?text=SD', featured: false },
  { id: 'p9', name: 'Zapatillas Blancas', category: 'Calzado', price: 95.00, stock: 10, imageUrl: 'https://placehold.co/100x100/fafafa/6b7280?text=ZB', featured: false },
  { id: 'p10', name: 'Cinturón Piel', category: 'Accesorios', price: 40.00, stock: 25, imageUrl: 'https://placehold.co/100x100/fef2f2/ef4444?text=CP', featured: false },
  { id: 'p11', name: 'Camiseta Básica', category: 'Camisas', price: 15.00, stock: 100, imageUrl: 'https://placehold.co/100x100/f3f4f6/6b7280?text=CB', featured: false },
  { id: 'p12', name: 'Abrigo de Lana Gris', category: 'Abrigos', price: 180.00, stock: 7, imageUrl: 'https://placehold.co/100x100/e5e7eb/374151?text=ALG', featured: false },
];


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, DecimalPipe],
  templateUrl: './editor-destacados.component.html', // APUNTA AL HTML SEPARADO
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DecimalPipe]
})
export class EditorDestacadosComponent implements OnInit {

  // Estado de la Aplicación
  products = signal<Product[]>([]);
  search = signal('');
  isLoading = signal(false); // Para el formulario de guardar

  newProduct = signal<{ name: string; category: string; price: number | null; stock: number | null; imageUrl: string }>({
    name: '',
    category: '',
    price: null,
    stock: null,
    imageUrl: '',
  });

  // Modal de Confirmación
  confirmModal = signal<ConfirmModal>({
    isOpen: false,
    message: '',
    productToDelete: null,
  });

  // Propiedades Computadas (Signals)
  featuredProducts = computed(() => this.products().filter((p) => p.featured));
  nonFeaturedProducts = computed(() => this.products().filter((p) => !p.featured));
  
  // Array para mostrar huecos vacíos en destacados (max 3)
  emptyFeaturedSlots = computed(() => Array(3 - this.featuredProducts().length).fill(0)); 

  filteredNonFeatured = computed(() => {
    const t = this.search().toLowerCase().trim();
    const list = this.nonFeaturedProducts();
    if (!t) return list;
    return list.filter(
      (p) =>
        p.name.toLowerCase().includes(t) || p.category.toLowerCase().includes(t)
    );
  });

  ngOnInit() {
    this.loadProducts();
  }

  // --- MÉTODOS DE PERSISTENCIA (localStorage temporal) ---

  private loadProducts() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      this.products.set(JSON.parse(data));
    } else {
      // Si no hay datos, inicializar con mock data
      this.products.set(MOCK_PRODUCTS);
      this.saveProducts();
    }
  }

  private saveProducts() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.products()));
  }

  // --- MÉTODOS DE GESTIÓN DE PRODUCTOS ---

  async createProduct() {
    const newP = this.newProduct();
    if (!newP.name || !newP.imageUrl) {
      console.warn('Completá nombre e imagen.');
      return;
    }

    this.isLoading.set(true);
    const newId = (Math.random() * 100000).toFixed(0);

    const newProduct: Product = {
      id: `p${newId}`,
      name: newP.name,
      category: newP.category || 'Sin categoría',
      price: Number(newP.price) || 0,
      stock: Number(newP.stock) || 0,
      imageUrl: newP.imageUrl,
      featured: false,
    };

    this.products.update(currentProducts => [newProduct, ...currentProducts]);
    this.saveProducts();
    this.newProduct.set({ name: '', category: '', price: null, stock: null, imageUrl: '' });
    this.isLoading.set(false);
  }

  toggleDestacado(product: Product) {
    const maxFeatured = 3;
    const isCurrentlyFeatured = product.featured;

    if (!isCurrentlyFeatured && this.featuredProducts().length >= maxFeatured) {
      console.warn('Solo se pueden destacar un máximo de 3 productos.');
      return;
    }

    this.products.update(currentProducts => 
      currentProducts.map(p =>
        p.id === product.id ? { ...p, featured: !isCurrentlyFeatured } : p
      )
    );
    this.saveProducts();
  }

  openDeleteModal(product: Product) {
    this.confirmModal.set({
      isOpen: true,
      message: `¿Estás seguro de que quieres eliminar permanentemente el producto "${product.name}"? Esta acción es irreversible.`,
      productToDelete: product,
    });
  }

  deleteProduct(product: Product) {
    this.confirmModal.set({ isOpen: false, message: '', productToDelete: null }); // Cerrar Modal
    this.products.update(currentProducts => currentProducts.filter(p => p.id !== product.id));
    this.saveProducts();
  }
}
