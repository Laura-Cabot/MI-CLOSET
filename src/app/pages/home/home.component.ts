import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PRODUCT_DATA } from '../../data/products';
import { HistoriaComponent } from '../historia/historia.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, CurrencyPipe, FormsModule, HistoriaComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {}

  categories = ['Promos', 'Ropa', 'Calzado', 'Hogar', 'Temporada', 'Joyeria'];
  featuredProducts = PRODUCT_DATA.slice(0, 3);

  showPromoAlert = false;

  ngOnInit() {
    this.showPromoAlert = true;
  }

  closePromoAlert() {
    this.showPromoAlert = false;
  }

  goToContact() {
    this.closePromoAlert();
    this.router.navigate(['/contacto']);
  }

  navigateToCategory(category: string) {
    const cat = category.trim().toLowerCase();
    if (cat === 'promos' || cat === 'promociones' || cat === 'descuentos') {
      this.router.navigate(['/promos']);
    } else {
      this.router.navigate(['/catalogo'], { queryParams: { category } });
    }
  }
}
