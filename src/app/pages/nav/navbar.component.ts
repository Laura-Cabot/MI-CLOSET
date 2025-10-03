import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './navbar.component.html',   // 👈 nombre correcto
  
})
export class NavComponent {
  isOpen = false;
  searchQuery: string = '';

  constructor(private router: Router, private cartService: CartService) {}

  // contador dinámico del carrito
  itemCount = () => this.cartService.cartItems().length;

  // buscador
  onSearch() {
    const q = this.searchQuery.trim();
    if (!q) return;
    this.router.navigate(['/catalogo'], { queryParams: { search: q } });
    this.searchQuery = '';
  }
}
