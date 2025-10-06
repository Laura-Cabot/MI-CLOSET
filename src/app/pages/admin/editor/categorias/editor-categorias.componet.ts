import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

const STORAGE_KEY = 'mc_categories';

@Component({
  selector: 'app-editor-categorias',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './editor-categorias.component.html',
})
export class EditorCategoriasComponent implements OnInit {
  categories: Category[] = [];
  newCategory: Partial<Category> = {};
  search = '';
  editingId: string | null = null;
  editData: Partial<Category> = {};

  ngOnInit() {
    this.load();
  }

  load() {
    const data = localStorage.getItem(STORAGE_KEY);
    this.categories = data ? JSON.parse(data) : [];
  }

  save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.categories));
  }

  filtered() {
    const t = this.search.toLowerCase().trim();
    if (!t) return this.categories;
    return this.categories.filter(c =>
      c.name.toLowerCase().includes(t) || c.description.toLowerCase().includes(t)
    );
  }

  addCategory() {
    if (!this.newCategory.name || !this.newCategory.imageUrl) {
      alert('Completá el nombre y la imagen.');
      return;
    }

    const newCat: Category = {
      id: crypto.randomUUID(),
      name: this.newCategory.name!,
      description: this.newCategory.description || '',
      imageUrl: this.newCategory.imageUrl!,
    };

    this.categories.unshift(newCat);
    this.save();
    this.newCategory = {};
  }

  deleteCategory(c: Category) {
    if (!confirm(`¿Eliminar la categoría "${c.name}"?`)) return;
    this.categories = this.categories.filter(x => x.id !== c.id);
    this.save();
  }

  startEdit(c: Category) {
    this.editingId = c.id;
    this.editData = { ...c };
  }

  cancelEdit() {
    this.editingId = null;
    this.editData = {};
  }

  applyEdit() {
    if (!this.editingId) return;
    this.categories = this.categories.map(c =>
      c.id === this.editingId ? { ...c, ...this.editData } : c
    );
    this.save();
    this.cancelEdit();
  }
}
