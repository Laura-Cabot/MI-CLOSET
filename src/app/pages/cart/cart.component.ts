import { Component, computed, OnInit, signal, OnDestroy } from '@angular/core';
import { CommonModule, CurrencyPipe, NgClass } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterLink, NgClass],
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit, OnDestroy {
  public cartItems: typeof this.cartService.cartItems;
  public cartTotal: typeof this.cartService.cartTotal;
  public expiryTime: typeof this.cartService.expiryTime;

  remainingTime = signal<string>('');
  private intervalId: any;

  constructor(private cartService: CartService) {
    this.cartItems = this.cartService.cartItems;
    this.cartTotal = this.cartService.cartTotal;
    this.expiryTime = this.cartService.expiryTime;
  }

  ngOnInit(): void {
    this.startCountdown();
  }

  isExpired = computed(() => {
    return this.expiryTime() < Date.now();
  });

  startCountdown(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.intervalId = setInterval(() => {
      const remainingMs = this.expiryTime() - Date.now();

      if (remainingMs <= 0) {
        this.remainingTime.set('00:00:00');
        this.cartService.checkAndClearExpiredCart();
        clearInterval(this.intervalId);
      } else {
        const seconds = Math.floor((remainingMs / 1000) % 60);
        const minutes = Math.floor((remainingMs / (1000 * 60)) % 60);
        const hours = Math.floor((remainingMs / (1000 * 60 * 60)) % 24);
        const days = Math.floor(remainingMs / (1000 * 60 * 60 * 24));

        const displayTime = `${days} días, ${String(hours).padStart(2, '0')}:${String(
          minutes
        ).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        this.remainingTime.set(displayTime);
      }
    }, 1000);
  }

  removeFromCart(itemId: string): void {
    this.cartService.removeFromCart(itemId);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
