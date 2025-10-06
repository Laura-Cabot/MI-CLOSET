import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './navbar.component.html',
})
export class NavComponent {
  isOpen = false;
  searchQuery = '';
  categories: string[] = ['Ropa', 'Calzado', 'Hogar', 'Temporada', 'Joyería'];

  constructor(private router: Router, private cartService: CartService) {}

  itemCount = () => this.cartService.cartItems().length;
  cartItems = () => this.cartService.cartItems();
  removeFromCart(id: string) {
    this.cartService.removeFromCart(id);
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  goToCategory(category: string) {
    this.isOpen = false;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/catalogo'], { queryParams: { category } });
    });
  }
}
