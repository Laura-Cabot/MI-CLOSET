import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// --- INTERFACES ---
interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

interface ConfirmModal {
  isOpen: boolean;
  message: string;
  categoryToDelete: Category | null;
}

const STORAGE_KEY = 'mc_categories';

@Component({
  selector: 'app-editor-categorias',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './editor-categorias.component.html',
})
export class EditorCategoriasComponent implements OnInit {
  // --- Estado con Signals ---
  categories = signal<Category[]>([]);
  newCategory = signal<Partial<Category>>({});
  search = signal('');
  editingId = signal<string | null>(null);
  editData: Partial<Category> = {};
  confirmModal = signal<ConfirmModal>({
    isOpen: false,
    message: '',
    categoryToDelete: null,
  });

  // --- Propiedades Computadas ---
  filtered = computed(() => {
    const t = this.search().toLowerCase().trim();
    const list = this.categories();
    if (!t) return list;
    return list.filter(
      (c) =>
        c.name.toLowerCase().includes(t) || c.description?.toLowerCase().includes(t)
    );
  });

  // --- Ciclo de Vida ---
  ngOnInit() {
    this.load();
  }

  // --- Persistencia (localStorage) ---
  load() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      this.categories.set(data ? JSON.parse(data) : this.createInitialMockData());
    } catch (e) {
      console.error("Error cargando localStorage, usando datos de prueba.", e);
      this.categories.set(this.createInitialMockData());
    }
  }

  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.categories()));
    } catch (e) {
      console.error("Error guardando en localStorage:", e);
    }
  }
  
  // --- Mock Data para inicializar ---
  createInitialMockData(): Category[] {
    return [
      { id: 'cat-1', name: 'Vestidos de Verano', description: 'Nuestra colección más fresca y colorida para el sol.', imageUrl: 'https://placehold.co/400x200/c7d2fe/3730a3?text=Verano' },
      { id: 'cat-2', name: 'Jeans & Denim', description: 'Cortes clásicos, ajustados y anchos para todo el año.', imageUrl: 'https://placehold.co/400x200/bae6fd/0369a1?text=Denim' },
      { id: 'cat-3', name: 'Accesorios y Joyería', description: 'El toque final: collares, pulseras y pendientes.', imageUrl: 'https://placehold.co/400x200/d9f99d/3f6212?text=Accesorios' },
    ];
  }

  // --- Funciones de Categorías ---

  addCategory() {
    const newCatData = this.newCategory();
    if (!newCatData.name || !newCatData.imageUrl) {
      console.error('El nombre y la URL de imagen son obligatorios.');
      return;
    }

    const newCat: Category = {
      id: crypto.randomUUID(),
      name: newCatData.name!,
      description: newCatData.description || '',
      imageUrl: newCatData.imageUrl!,
    };

    this.categories.update(cats => [newCat, ...cats]);
    this.save();
    this.newCategory.set({});
  }

  openDeleteModal(c: Category) {
    this.confirmModal.set({
      isOpen: true,
      message: `¿Estás seguro de que quieres eliminar la categoría "${c.name}"?`,
      categoryToDelete: c,
    });
  }

  deleteCategory(c: Category) {
    this.categories.update(cats => cats.filter(x => x.id !== c.id));
    this.save();
    this.confirmModal.set({ isOpen: false, message: '', categoryToDelete: null });
  }

  startEdit(c: Category) {
    this.editingId.set(c.id);
    this.editData = { ...c };
  }

  cancelEdit() {
    this.editingId.set(null);
    this.editData = {};
  }

  applyEdit() {
    if (!this.editingId()) return;
    this.categories.update(cats =>
      cats.map(c =>
        c.id === this.editingId() ? { ...c, ...this.editData } : c
      )
    );
    this.save();
    this.cancelEdit();
  }
}