import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  standalone: true,
  imports: [FormsModule]
})
export class LoginComponent {

  userName: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login({ userName: this.userName, password: this.password })
      .subscribe({
        next: (res) => {
          this.authService.setToken(res.token);

          this.router.navigate(['/dashboard']); 
        },
        error: (err) => {
          alert('Usuario o contraseña incorrectos');
        }
      });
  }

  goToRegisterTramite() {
    this.router.navigate(['/login/registrar-tramite']);
  }

  goToRastrearTramite() {
    this.router.navigate(['/tramite']); 
  }
}