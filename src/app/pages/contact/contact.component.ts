import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  FormBuilder, 
  FormGroup, 
  Validators, 
  ReactiveFormsModule,
  AbstractControl
} from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  private fb = inject(FormBuilder);
  
  contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });
  
  submissionMessage = signal<{ text: string, type: 'success' | 'error' } | null>(null);

  get nameControl(): AbstractControl {
    return this.contactForm.get('name')!;
  }

  get emailControl(): AbstractControl {
    return this.contactForm.get('email')!;
  }

  get messageControl(): AbstractControl {
    return this.contactForm.get('message')!;
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log('Formulario listo para enviar:', this.contactForm.value);

      this.submissionMessage.set({
        text: 'Formulario válido. El backend debe conectar aquí para enviar los datos.',
        type: 'success'
      });

      this.contactForm.reset();
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } else {
      this.contactForm.markAllAsTouched();
      this.submissionMessage.set({
        text: 'Por favor, completa todos los campos obligatorios correctamente.',
        type: 'error'
      });
    }
  }
}
