import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { HistoriaComponent } from './pages/historia/historia.component';
import { PromosComponent } from './pages/promos/promos.component';

import { CartComponent } from './pages/cart/cart.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './pages/auth/login/login.component';

import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { EditorProductosComponent } from './pages/admin/editor/editor-productos/editor-productos.component';
import { EditorDestacadosComponent } from './pages/admin/editor/editor-destacados/editor-destacados.component';
import { EditorCategoriasComponent } from './pages/admin/editor/categorias/editor-categorias.componet';
import { EditorPromosComponent } from './pages/admin/editor/promociones/editor-promos.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Mi Closet App - Inicio' },
  { path: 'historia', component: HistoriaComponent, title: 'Nuestra Historia' },
  { path: 'promos', component: PromosComponent, title: 'Descuentos Bancarios' },
  { path: 'catalogo', component: ProductListComponent, title: 'Catálogo de Prendas' },

  { path: 'carrito', component: CartComponent, title: 'Carrito de Compras' },
  { path: 'contacto', component: ContactComponent, title: 'Contacto y Soporte' },
  { path: 'login', component: LoginComponent, title: 'Iniciar Sesión' },

  { path: 'admin', component: DashboardComponent, title: 'Panel de Control' },
  {
    path: 'admin/editor-productos',
    component: EditorProductosComponent,
    title: 'Editor de Productos',
  },
  {
    path: 'admin/editor-destacados',
    component: EditorDestacadosComponent,
    title: 'Editor de Destacados',
  },
  {
    path: 'admin/editor-categorias',
    component: EditorCategoriasComponent,
    title: 'Editor de Categorías',
  },
  { path: 'admin/editor-promos', component: EditorPromosComponent, title: 'Editor de Promociones' },

  { path: '**', redirectTo: '' },
];
