import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Promo {
  banco: string;
  descuento: number;
  fecha: string;
  imagen?: string; // 🖼️ Nuevo campo opcional
}

@Component({
  selector: 'app-editor-promos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './editor-promos.component.html',
})
export class EditorPromosComponent implements OnInit {
  promos: Promo[] = [];
  nuevaPromo: Promo = {
    banco: '',
    descuento: 0,
    fecha: '',
    imagen: '',
  };

  private STORAGE_KEY = 'mc_promos';

  ngOnInit() {
    this.cargarPromos();
  }

  cargarPromos() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    this.promos = data ? JSON.parse(data) : [];
  }

  guardarPromos() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.promos));
  }

  agregarPromo() {
    if (!this.nuevaPromo.banco || !this.nuevaPromo.descuento) {
      alert('Por favor, completá los campos obligatorios.');
      return;
    }

    this.promos.push({ ...this.nuevaPromo });
    this.guardarPromos();

    // Limpiar el formulario
    this.nuevaPromo = {
      banco: '',
      descuento: 0,
      fecha: '',
      imagen: '',
    };
  }

  eliminarPromo(index: number) {
    if (!confirm('¿Eliminar esta promoción?')) return;
    this.promos.splice(index, 1);
    this.guardarPromos();
  }

  goBackToDashboard() {
    history.back();
  }
}
