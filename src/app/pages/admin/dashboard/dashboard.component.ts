import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './dashboard.component.html',
  styles: [`
    :host {
      display: block;
      padding: 2rem;
      background-color: #f9fafb;
      min-height: 100vh;
    }
  `]
})
export class DashboardComponent {
  isAuthenticated = false;
  accessKey = '';
  private fixedKey = 'micloset2025'; // 🔑 clave fija

  constructor() {
    if (localStorage.getItem('adminAuth') === 'true') {
      this.isAuthenticated = true;
    }
  }

  checkKey() {
    if (this.accessKey === this.fixedKey) {
      this.isAuthenticated = true;
      localStorage.setItem('adminAuth', 'true');
    } else {
      alert('Clave incorrecta');
    }
  }

  logout() {
    this.isAuthenticated = false;
    this.accessKey = '';
    localStorage.removeItem('adminAuth');
  }
}
