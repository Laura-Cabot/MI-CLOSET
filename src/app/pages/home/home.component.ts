import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PRODUCT_DATA } from '../../data/products';
import { Item } from '../../models/item.model';
import { ReviewsComponent } from "../reviews/reviews.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, CurrencyPipe, ReviewsComponent, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categories = ['Ropa', 'Accesorios', 'Disfraces', 'Hogar', 'Calzado', 'Promos'];
  featuredProducts = PRODUCT_DATA.slice(0, 3);

  colorMap: { [key: string]: string } = {
    'Negro': 'black',
    'Blanco': 'white',
    'Gris': 'gray',
    'Rojo': 'red',
    'Azul Claro': '#87CEEB',
    'Azul Oscuro': '#00008B',
    'Verde': 'green',
    'Amarillo': 'yellow',
    'Marrón': '#8B4513',
    'Beige': '#f5f5dc',
    'Rosado': 'pink'
  };

  ngOnInit() {
    this.featuredProducts = PRODUCT_DATA.slice(0, 3);
  }
}
