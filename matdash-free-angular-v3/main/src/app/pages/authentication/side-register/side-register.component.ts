import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatCard, MatCardModule} from "@angular/material/card";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatInput, MatInputModule} from "@angular/material/input";
import {Router} from "@angular/router";
import {PersonaService} from "../../../providers/services/persona/persona.service";

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
  usuarios: Usuario[] = []; // Guardamos los usuarios registrados

  constructor(private router: Router, private fb: FormBuilder, private personaService: PersonaService) {}

  ngOnInit() {
    this.usuarioForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      dni: ['', Validators.required],
      direccion: [''],
      telefono: [''],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  registrarUsuario() {
    if (this.usuarioForm.invalid) return;

    const nuevoUsuario = this.usuarioForm.value;

    // Validar que no exista DNI o Username
    const existe = this.usuarios.some(
      u => u.dni === nuevoUsuario.dni || u.username === nuevoUsuario.username
    );

    if (existe) {
      alert('El DNI o el Username ya están registrados.');
      return;
    }

    this.usuarios.push(nuevoUsuario);
    alert('Usuario registrado correctamente.');
    this.usuarioForm.reset();
  }
}
