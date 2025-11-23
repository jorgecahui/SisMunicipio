import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatFormFieldModule} from "@angular/material/form-field";
import { MatCardModule} from "@angular/material/card";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatInput, MatInputModule} from "@angular/material/input";
import {Router} from "@angular/router";
import {PersonaService} from "../../../providers/services/persona/persona.service";
import {RegistrarService} from "../../../providers/services/registrar/registrar.service";

interface Usuario {
  nombres: string;
  apellidos: string;
  dni: string;
  direccion?: string;
  telefono?: string;
  username: string;
  password: string;
}

@Component({
  selector: 'app-registro',
  standalone: true,
  templateUrl: './side-register.component.html',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
  ]
})
export class RegistroComponent implements OnInit {
  usuarioForm!: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private registerService: RegistrarService) {}

  ngOnInit() {
    this.usuarioForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      dni: ['', Validators.required],
      correo: [''],
      telefono: [''],
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  registrarUsuario() {
    if (this.usuarioForm.invalid) return;

    const form = this.usuarioForm.value;

    // 👇 Aquí armamos el DTO EXACTO que tu backend necesita
    const payload = {
      userName: form.userName,
      password: form.password,
      persona: {
        nombres: form.nombres,
        apellidos: form.apellidos,
        dni: form.dni,
        direccion: form.direccion,
        telefono: form.telefono,
        correo: form.correo
      }
    };

    console.log("Payload enviado:", payload);

    this.registerService.add$(payload).subscribe({
      next: () => {
        alert('Usuario registrado correctamente');
        this.usuarioForm.reset();
        this.router.navigate(['authentication/login']);
      },
      error: (err) => {
        console.error("Error registro:", err);
        alert('Error al registrar el usuario');
      }
    });
  }
}
