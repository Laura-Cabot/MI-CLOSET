import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // opcional
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  loginMessage = signal<{ text: string; type: 'success' | 'error' } | null>(null);

  get emailControl(): AbstractControl {
    return this.loginForm.get('email')!;
  }

  get passwordControl(): AbstractControl {
    return this.loginForm.get('password')!;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      const raw = localStorage.getItem('demoUser');
      if (!raw) {
        this.loginMessage.set({
          text: 'No hay usuarios registrados. Registrate primero.',
          type: 'error'
        });
        setTimeout(() => this.loginMessage.set(null), 5000);
        return;
      }

      const user = JSON.parse(raw) as { email: string; password: string };

      if (email === user.email && password === user.password) {
        this.loginMessage.set({
          text: '¡Sesión iniciada con éxito! Redirigiendo...',
          type: 'success'
        });
        setTimeout(() => this.router.navigate(['/']), 1000);
      } else {
        this.loginMessage.set({
          text: 'Credenciales inválidas.',
          type: 'error'
        });
        setTimeout(() => this.loginMessage.set(null), 5000);
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
