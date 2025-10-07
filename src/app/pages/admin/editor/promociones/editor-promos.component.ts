import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// 🔑 Interfaz Única y Flexible
interface Promo {
  titulo: string;           
  descuento: number;
  fecha: string;
  descripcion: string;     
  imagen?: string;          // 🔑 CLAVE: Si tiene imagen, es un flyer/banner.
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
    titulo: '',
    descuento: 0,
    fecha: '',
    descripcion: '',
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
    if (!this.nuevaPromo.titulo || !this.nuevaPromo.descripcion) {
      alert('Por favor, completa el título y la descripción de la promoción.');
      return;
    }
    
    this.promos.push({ ...this.nuevaPromo });
    this.guardarPromos();

    // Limpiar el formulario
    this.nuevaPromo = {
      titulo: '',
      descuento: 0,
      fecha: '',
      descripcion: '',
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