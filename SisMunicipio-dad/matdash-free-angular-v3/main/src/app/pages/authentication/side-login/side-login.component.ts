import {Component} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import {MaterialModule} from 'src/app/material.module';
import {AuthService} from "../../../providers/services/auth/auth.service";
import {TokenModels} from "../../../models/token-models";

@Component({
  selector: 'app-side-login',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent {
  form = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password: new FormControl('', [Validators.required]),
  });

  loading = false;
  error = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  get f() {
    return this.form.controls;
  }

  submit() {
    this.router.navigate(['']);
  }

  protected login() {
    if (this.form.invalid) {
      console.log('Formulario inválido');
      return;
    }

    this.loading = true;
    this.error = '';

    console.log('Datos de login:', this.form.value);

    // ↓↓↓ CAMBIO IMPORTANTE: Usar login() en lugar de add$() ↓↓↓
    this.authService.login(this.form.value).subscribe({
      next: (response) => {
        console.log('✅ Login exitoso:', response);
        console.log('🔑 Token:', response.token);
        console.log('👤 PersonaId:', response.personaId);
        console.log('🎭 Roles:', response.roles);

        // Navegar después del login exitoso
        this.router.navigate(['/ui-components/document']);
      },
      error: (error) => {
        console.error('❌ Error en login:', error);
        this.error = 'Error en el login. Verifica tus credenciales.';
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
