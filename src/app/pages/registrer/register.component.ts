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
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'] // opcional
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  registerForm: FormGroup = this.fb.group(
    {
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    },
    { validators: this.passwordMatchValidator() }
  );

  registerMessage = signal<{ text: string; type: 'success' | 'error' } | null>(null);

  get nameControl(): AbstractControl {
    return this.registerForm.get('name')!;
  }
  get emailControl(): AbstractControl {
    return this.registerForm.get('email')!;
  }
  get passwordControl(): AbstractControl {
    return this.registerForm.get('password')!;
  }
  get confirmPasswordControl(): AbstractControl {
    return this.registerForm.get('confirmPassword')!;
  }

  private passwordMatchValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const pass = group.get('password')?.value;
      const confirm = group.get('confirmPassword')?.value;
      return pass === confirm ? null : { passwordMismatch: true };
    };
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { name, email, password } = this.registerForm.value;

      // ⚡ Guardar usuario en localStorage (demo sin backend)
      localStorage.setItem('demoUser', JSON.stringify({ email, password }));

      this.registerMessage.set({
        text: `¡Usuario ${name} registrado con éxito!`,
        type: 'success'
      });

      this.registerForm.reset();

      // Redirigir a login
      setTimeout(() => this.router.navigate(['/login']), 1500);
    } else {
      this.registerForm.markAllAsTouched();
      this.registerMessage.set({
        text: 'Corrige los errores antes de continuar.',
        type: 'error'
      });
    }
  }
}
