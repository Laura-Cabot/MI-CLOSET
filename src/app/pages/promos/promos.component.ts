import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Promo {
  id: number;
  banco: string; // Vacío porque la información está en la imagen
  descuento: string; // Vacío porque la información está en la imagen
  descripcion: string; // Vacío porque la información está en la imagen
  vigencia: string; // Vacío porque la información está en la imagen
  imagen: string;
}

@Component({
  selector: 'app-promos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './promos.component.html',
  styleUrls: ['./promos.component.css']
})
export class PromosComponent implements OnInit {
  promos: Promo[] = [];

  ngOnInit() {
    // Las 6 promociones son flyers (imágenes) puros.
    // Los campos de texto se dejan vacíos ('' o "") para que el HTML no muestre nada.
    this.promos = [
      {
        id: 1,
        banco: '',
        descuento: '',
        descripcion: '',
        vigencia: '',
        imagen: 'assets/promos/BBVA.webp'
      },
      {
        id: 2,
        banco: '',
        descuento: '',
        descripcion: '',
        vigencia: '',
        imagen: 'assets/promos/citibanamex.webp'
      },
      {
        id: 3,
        banco: '',
        descuento: '',
        descripcion: '',
        vigencia: '',
        imagen: 'assets/promos/openpay.webp'
      },
      {
        id: 4,
        banco: '',
        descuento: '',
        descripcion: '',
        vigencia: '',
        imagen: 'assets/promos/rio.webp'
      },
      {
        id: 5,
        banco: '',
        descuento: '',
        descripcion: '',
        vigencia: '',
        imagen: 'assets/promos/banorte.webp'
      },
      {
        id: 6,
        banco: '',
        descuento: '',
        descripcion: '',
        vigencia: '',
        imagen: 'assets/promos/scotiabank.webp'
      }
    ];
  }
}
