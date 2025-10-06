import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  FormBuilder, 
  FormGroup, 
  Validators, 
  ReactiveFormsModule, 
  AbstractControl, 
  ValidatorFn, 
  ValidationErrors 
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  isLoginMode = signal(true);
  message = signal<{ text: string; type: 'success' | 'error' } | null>(null);

  // Formularios
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  registerForm: FormGroup = this.fb.group(
    {
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    },
    { validators: this.passwordMatchValidator() }
  );

  // --- Getters ---
  get emailControl(): AbstractControl {
    return (this.isLoginMode() ? this.loginForm : this.registerForm).get('email')!;
  }
  get passwordControl(): AbstractControl {
    return (this.isLoginMode() ? this.loginForm : this.registerForm).get('password')!;
  }
  get nameControl(): AbstractControl {
    return this.registerForm.get('name')!;
  }
  get confirmPasswordControl(): AbstractControl {
    return this.registerForm.get('confirmPassword')!;
  }

  // --- Métodos ---
  toggleMode() {
    this.isLoginMode.update(v => !v);
    this.message.set(null);
  }

  private passwordMatchValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const pass = group.get('password')?.value;
      const confirm = group.get('confirmPassword')?.value;
      return pass === confirm ? null : { passwordMismatch: true };
    };
  }

  onSubmit(): void {
    if (this.isLoginMode()) {
      this.handleLogin();
    } else {
      this.handleRegister();
    }
  }

  private handleLogin() {
    const form = this.loginForm;
    if (form.valid) {
      const { email, password } = form.value;
      const raw = localStorage.getItem('demoUser');

      if (!raw) {
        this.message.set({ text: 'No hay usuarios registrados. Registrate primero.', type: 'error' });
        return;
      }

      const user = JSON.parse(raw);
      if (email === user.email && password === user.password) {
        this.message.set({ text: '¡Bienvenida a Mi Closet! Iniciaste sesión correctamente 💖', type: 'success' });
        setTimeout(() => this.router.navigate(['/']), 1500);
      } else {
        this.message.set({ text: 'Credenciales inválidas. Intenta de nuevo.', type: 'error' });
      }
    } else form.markAllAsTouched();
  }

  private handleRegister() {
    const form = this.registerForm;
    if (form.valid) {
      const { name, email, password } = form.value;
      localStorage.setItem('demoUser', JSON.stringify({ email, password }));

      this.message.set({
        text: `¡Gracias por registrarte, ${name}! 🎉 Te llegará un correo con tu código de 10% de descuento.`,
        type: 'success'
      });

      form.reset();
      setTimeout(() => this.isLoginMode.set(true), 2500);
    } else {
      form.markAllAsTouched();
      this.message.set({ text: 'Revisá los campos antes de continuar.', type: 'error' });
    }
  }
}
