import { Component, computed, OnInit, signal, OnDestroy } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterLink, FormsModule],
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

  // 🔹 Propiedades para el descuento
  discountCode: string = '';
  discountApplied: boolean = false;
  discountMessage: string = '';
  discountValue: number = 0.1; // 10%

  // 🔹 Aplicar descuento
  applyDiscount() {
    const code = this.discountCode.trim().toUpperCase();

    if (!code) {
      this.discountMessage = '❌ Ingresá un código primero.';
      return;
    }

    if (this.discountApplied) {
      this.discountMessage = '⚠️ El descuento ya fue aplicado.';
      return;
    }

    if (code === 'MI10OFF') {
      this.discountApplied = true;
      this.discountMessage = '✅ Descuento aplicado: 10% OFF.';
    } else {
      this.discountMessage = '❌ Código inválido.';
    }

    // 🔹 limpiar input siempre
    setTimeout(() => (this.discountCode = ''), 0);
  }

  // 💳 Simulación de compra
  checkout() {
    if (this.cartItems().length === 0) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'warning',
        title: 'Tu carrito está vacío',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        background: '#fdfdfd',
        color: '#333'
      });
      return;
    }

    // Paso 1: mostrar carga tipo "procesando pago"
    Swal.fire({
      title: 'Procesando compra...',
      html: '<p class="text-sm text-gray-500">Por favor esperá unos segundos</p>',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
      background: '#fff',
      color: '#333',
      customClass: {
        popup: 'rounded-xl shadow-lg',
        title: 'text-base font-semibold text-gray-800',
        htmlContainer: 'text-sm text-gray-600'
      }
    });

    // Paso 2: simular confirmación de pago con número de pedido
    setTimeout(() => {
      const orderId = `#MLC-${Math.floor(Math.random() * 9000 + 1000)}`;

      Swal.fire({
        icon: 'success',
        title: 'Compra completada 🛍️',
        html: `
          <p class="text-gray-700 text-sm mb-2">
            ¡Gracias por tu compra!
          </p>
          <p class="text-gray-500 text-xs mb-1">
            Número de pedido: <b>${orderId}</b>
          </p>
          <p class="text-gray-500 text-xs">
            Recibirás la confirmación y los detalles del envío por correo.
          </p>
        `,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#22c55e',
        background: '#fff',
        color: '#333',
        customClass: {
          popup: 'rounded-xl shadow-md',
          title: 'text-base font-semibold text-gray-800',
          htmlContainer: 'text-sm text-gray-600'
        }
      });

      // 🔹 Vaciar carrito después del pago simulado
      this.cartService.clearCart();
    }, 2000);
  }
}
