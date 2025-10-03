import { initializeApp } from 'firebase/app';
import { environment } from '../environments/environment';
import { Component, computed, OnInit, signal, Injector } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from './services/cart.service';
import { FormsModule } from '@angular/forms';
import { NavComponent } from './pages/nav/navbar.component';
import { FooterComponent } from './pages/footer/footer.component';

import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, NavComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Mi Closet App';
  isOpen = false;
  userId = signal('Anon');
  itemCount = computed(() => this.cartService.cartItems().length);

  showPromoAlert = true;

  private firebaseApp: any;
  private db: any;
  private auth: any;

  constructor(
    private cartService: CartService,
    private injector: Injector,
    private router: Router
  ) {
    this.initializeFirebase();
    this.handleAuth();
  }

  ngOnInit() {}

  closePromoAlert() {
    this.showPromoAlert = false;
  }

  private initializeFirebase() {
    try {
      this.firebaseApp = initializeApp(environment.firebaseConfig);
      this.db = getFirestore(this.firebaseApp);
      this.auth = getAuth(this.firebaseApp);

      console.log('✅ Firebase inicializado');
    } catch (error) {
      console.error('❌ Error al inicializar Firebase:', error);
    }
  }

  private async handleAuth() {
    if (!this.auth) return;

    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        this.userId.set(user.uid);
        this.cartService.setAuthInfo(this.db, user.uid);
      } else {
        try {
          const credential = await signInAnonymously(this.auth);
          this.userId.set(credential.user.uid);
          this.cartService.setAuthInfo(this.db, this.userId());
        } catch (error) {
          console.error('❌ Error en la autenticación Firebase:', error);
        }
      }
    });
  }
  goToContact() {
    this.showPromoAlert = false;
    this.router.navigate(['/contacto']);
  }
}
