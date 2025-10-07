import { Component, OnInit, ChangeDetectorRef, HostListener } from '@angular/core'; // 🔑 Importamos HostListener
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
  // 🔑 Inyectamos Router y ChangeDetectorRef
  constructor(private router: Router, private cdr: ChangeDetectorRef) {} 

  categories = ['Promos', 'Ropa', 'Calzado', 'Hogar', 'Temporada', 'Joyeria'];
  featuredProducts = PRODUCT_DATA.slice(0, 3);

  showPromoAlert = false;
  // 🔑 Nueva variable para controlar la visibilidad del botón
  showScrollTopButton: boolean = false; 

  // 🔑 NG ON INIT
  ngOnInit() {
    // Retraso de 5 segundos para el pop-up
    setTimeout(() => {
      this.showPromoAlert = true;
      this.cdr.detectChanges(); // Forzamos la detección de cambios
    }, 5000);
  }

  // --- Lógica del Botón Flotante ---

  // 🔑 1. Detectar el Scroll y cambiar la visibilidad
  // HomeComponent.ts (Bloque corregido)
// ...

  // 🔑 1. Detectar el Scroll y cambiar la visibilidad
  @HostListener('window:scroll') // ❌ NO lleva ['event'] ni ['event']
  onScroll() { // ❌ NO lleva argumentos aquí tampoco
    // Muestra el botón si el scroll vertical es mayor a 300px
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    
    if (currentScroll > 300 && !this.showScrollTopButton) {
      this.showScrollTopButton = true;
      this.cdr.detectChanges(); 
    } else if (currentScroll <= 300 && this.showScrollTopButton) {
      this.showScrollTopButton = false;
      this.cdr.detectChanges(); 
    }
  }

// ...

  // 🔑 2. Función para mover al inicio de la página
  scrollToTop() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' // Desplazamiento suave
    });
  }

  // --- Lógica del Pop-up y Navegación ---

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