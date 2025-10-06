import { Component, computed, OnInit, signal, Injector } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { environment } from '../environments/environment';

import { CartService } from './services/cart.service';
import { NavComponent } from './pages/nav/navbar.component';
import { FooterComponent } from './pages/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    FormsModule,
    NavComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Mi Closet App';
  userId = signal('Anon');
  itemCount = computed(() => this.cartService.cartItems().length);

  private firebaseApp: any;
  private db: any;
  private auth: any;

  constructor(
    private cartService: CartService,
    private injector: Injector
  ) {
    this.initializeFirebase();
    this.handleAuth();
  }

  ngOnInit() {
    console.log('🧷 AppComponent cargado correctamente');
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
    console.warn('⚠️ Autenticación Firebase desactivada temporalmente.');
    return;
  }
}
