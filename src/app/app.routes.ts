import { Routes } from '@angular/router';

// Componentes Principales
import { HomeComponent } from './pages/home/home.component';
import { ProductListComponent } from './pages/product-list/product-list.component';

// Componentes de Usuario y Carrito
import { CartComponent } from './pages/cart/cart.component';
import { RegisterComponent } from './pages/registrer/register.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './pages/auth/login/login.component';

// Componentes de Admin
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { EditorComponent } from './pages/admin/editor/editor.component';
import { HistoriaComponent } from './pages/historia/historia.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Mi Closet App - Inicio' },

  { path: 'historia', component: HistoriaComponent, title: 'Nuestra Historia' },

  { path: 'catalogo', component: ProductListComponent, title: 'Catálogo de Prendas' },

  // Rutas de Usuario y Carrito
  { path: 'carrito', component: CartComponent, title: 'Carrito de Compras' },
  { path: 'registro', component: RegisterComponent, title: 'Crear Cuenta' },

  // Rutas de Información
  { path: 'contacto', component: ContactComponent, title: 'Contacto y Soporte' },

  // Rutas de Login
  { path: 'login', component: LoginComponent, title: 'Iniciar Sesión' },

  // Panel de Administración
  { path: 'admin', component: DashboardComponent, title: 'Panel de Control' },

  { path: 'admin/editor', component: EditorComponent, title: 'Editor de Productos' },

  // Ruta comodín
  { path: '**', redirectTo: '' },
];
