import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  standalone: true,
  imports: [FormsModule]
})
export class LoginComponent {
  userName = '';
  password = '';

  private authService = inject(AuthService);
  private router = inject(Router);

  login() {
    this.authService.login({ userName: this.userName, password: this.password })
      .subscribe({
        next: (res) => {
          this.authService.setToken(res.token);   
          this.router.navigate(['/dashboard']);  
        },
        error: (err) => {
          console.error(err);
          alert('Usuario o contraseña incorrectos');
        }
      });
  }

  goToRegisterTramite() {
  this.router.navigate(['/tramite/nuevo']);
  }

  goToRastrearTramite() {
  this.router.navigate(['/tramite']); 
  }
}