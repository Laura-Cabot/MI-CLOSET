import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Promo {
  id: number;
  banco: string;
  descuento: string;
  descripcion: string;
  vigencia: string;
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
    this.promos = [
      {
        id: 1,
        banco: 'Banco Nación',
        descuento: '20% OFF',
        descripcion: 'Todos los sábados en indumentaria y calzado.',
        vigencia: 'Válido hasta 31/10/2025',
        imagen: 'assets/promos/bna.webp'
      },
      {
        id: 2,
        banco: 'Banco Provincia',
        descuento: '30% OFF',
        descripcion: 'Pagando con Cuenta DNI los miércoles.',
        vigencia: 'Válido hasta 30/11/2025',
        imagen: 'assets/promos/provincia.webp'
      },
      {
        id: 3,
        banco: 'Banco Galicia',
        descuento: '25% OFF + 3 cuotas sin interés',
        descripcion: 'En compras online con tarjeta de crédito.',
        vigencia: 'Hasta agotar stock',
        imagen: 'assets/promos/galicia.webp'
      },
    {
      id: 4,
      banco: 'Banco Santander',
      descuento: '15% OFF',
      descripcion: 'En todas las compras superiores a $5000.',
      vigencia: 'Válido hasta 31/12/2025',
      imagen: 'assets/promos/santander.webp'
    },
    {
      id: 5,
      banco: 'Banco Macro',
      descuento: '20% OFF + 6 cuotas sin interés',
      descripcion: 'En indumentaria y accesorios pagando con tarjeta Macro.',
      vigencia: 'Válido hasta 31/12/2025',
      imagen: 'assets/promos/macro.webp'
    },
    {
      id: 6,
      banco: 'Banco ICBC',
      descuento: '10% OFF',
      descripcion: 'En compras online con tarjeta de crédito.',
      vigencia: 'Hasta agotar stock',
      imagen: 'assets/promos/icbc.webp'
    }
    ];
  }
}
