import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { PersonaService } from '../../../providers/services/persona/persona.service';
import { Persona } from '../../../models/persona.model';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-persona-form',
  templateUrl: './persona-form.component.html',
  standalone: true,
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule, FormsModule, MatInputModule, MatButtonModule, MatFormFieldModule]
})
export class PersonaFormComponent {
  form: FormGroup;

  constructor(
    private personaService: PersonaService,
    private dialogRef: MatDialogRef<PersonaFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Persona | null
  ) {
    this.form = new FormGroup({
      id: new FormControl(data?.id),
      nombres: new FormControl(data?.nombres || '', [Validators.required]),
      apellidos: new FormControl(data?.apellidos || '', [Validators.required]),
      dni: new FormControl(data?.dni || '', [Validators.required]),
      direccion: new FormControl(data?.direccion || ''),
      telefono: new FormControl(data?.telefono || '')
    });
  }

  guardar() {
    const persona: Persona = this.form.value;

    if (persona.id) {
      this.personaService.update$(String(persona.id), persona).subscribe(() => {
        this.dialogRef.close(true);
      });
    } else {
      this.personaService.add$(persona).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}
