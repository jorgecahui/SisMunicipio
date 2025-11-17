import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {DocumentoService} from "../../../../providers/services/documentos/documento.service";

@Component({
  selector: 'app-editar-documento',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './formdocument.component.html'
})
export class EditarDocumentoComponent implements OnInit {
  modoEliminar = false;
  documento: any = null;
  guardando: boolean = false;
  dniModificado: boolean = false;
  nombreOriginal: string = '';
  dniOriginal: string = '';
  id: number;


  edicionForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private documentoService: DocumentoService
  ) {
    this.edicionForm = this.createForm();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const url = this.router.url;

    if (!id) return;

    if (url.includes('/delete/')) {
      this.modoEliminar = true;
      this.eliminar(Number(id));
      return;   // 👈 detener ejecución aquí
    }

    // Modo editar
    this.modoEliminar = false;
    this.cargarDocumento(Number(id));
  }


  cargarDocumento(id: number): void {
    // Simular carga de documento - reemplaza con tu servicio real
    this.documentoService.getById$(String(id)).subscribe({
      next: (documento) => {
        this.documento = documento;
        this.cargarDatosDocumento();
      },
      error: (error) => {
        console.error('Error cargando documento:', error);
        this.router.navigate(['/ui-components/document']);
      }
    });
  }

  cargarDatosDocumento(): void {
    if (!this.documento) return;

    this.nombreOriginal = this.documento.nombre || '';
    this.dniOriginal = this.documento.dni || '';

    this.edicionForm.patchValue({
      nombre: this.documento.nombre || '',
      dni: this.documento.dni || '',
      asunto: this.documento.asunto || '',
      codigo: this.documento.codigo || ''
    });

    // Monitorear cambios en DNI
    const dniControl = this.edicionForm.get('dni');
    if (dniControl) {
      dniControl.valueChanges.subscribe(nuevoDni => {
        this.dniModificado = nuevoDni !== this.dniOriginal;
        this.actualizarValidadoresDni();
      });
    }
  }

  private actualizarValidadoresDni(): void {
    const justificacionDniControl = this.edicionForm.get('justificacionDni');
    if (justificacionDniControl) {
      if (this.dniModificado) {
        justificacionDniControl.setValidators([Validators.required]);
      } else {
        justificacionDniControl.clearValidators();
        justificacionDniControl.setValue('');
      }
      justificacionDniControl.updateValueAndValidity();
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      nombre: ['', [Validators.required, this.soloCorreccionOrtograficaValidator.bind(this)]],
      dni: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
      asunto: ['', Validators.required],
      codigo: [{value: '', disabled: true}],
      justificacionDni: [''],
      justificacionGeneral: ['', Validators.required]
    });
  }

  // 🔥 CORRECCIÓN: Definir el validador como método de la clase
  soloCorreccionOrtograficaValidator(control: AbstractControl): { [key: string]: any } | null {
    const valor = control.value;
    if (!valor) return null;

    // Validación de solo letras y espacios
    const cambiosPermitidos = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

    if (!cambiosPermitidos.test(valor)) {
      return { 'soloCorreccionOrtografica': true };
    }

    return null;
  }

  guardarCambios(): void {
    if (this.edicionForm.valid && this.documento) {
      this.guardando = true;

      const datosEditados = {
        ...this.documento,
        ...this.edicionForm.getRawValue(),
        fechaModificacion: new Date(),
        usuarioModificador: 'usuario_actual'
      };

      // Simular guardado - reemplaza con tu servicio real
      this.documentoService.update$(String(this.documento.id), datosEditados).subscribe({
        next: () => {
          this.guardando = false;
          this.router.navigate(['/ui-components/document/']);
        },
        error: (error) => {
          console.error('Error guardando documento:', error);
          this.guardando = false;
        }
      });
    } else {
      this.marcarControlesComoSucios(); // 🔥 Ahora este método existe
    }
  }

  // 🔥 CORRECCIÓN: Definir el método que faltaba
  private marcarControlesComoSucios(): void {
    Object.keys(this.edicionForm.controls).forEach(key => {
      const control = this.edicionForm.get(key);
      if (control) {
        control.markAsDirty();
        control.markAsTouched();
      }
    });
  }

  cancelarEdicion(): void {
    this.router.navigate(['/ui-components/document']);
  }

  private limpiarFormulario(): void {
    this.edicionForm.reset();
    this.nombreOriginal = '';
    this.dniOriginal = '';
    this.dniModificado = false;
  }

  // Getters para el template
  get nombreInvalido(): boolean {
    const control = this.edicionForm.get('nombre');
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  get dniInvalido(): boolean {
    const control = this.edicionForm.get('dni');
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  get asuntoInvalido(): boolean {
    const control = this.edicionForm.get('asunto');
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  // Getters individuales para controles específicos
  get nombre() {
    return this.edicionForm.get('nombre');
  }

  get dni() {
    return this.edicionForm.get('dni');
  }

  get asunto() {
    return this.edicionForm.get('asunto');
  }

  get justificacionGeneral() {
    return this.edicionForm.get('justificacionGeneral');
  }

  get justificacionDni() {
    return this.edicionForm.get('justificacionDni');
  }

  eliminar(id: number): void {

    if (!confirm('¿Seguro que deseas eliminar este documento?')) {
      this.router.navigate(['/ui-components/document']);
      return;
    }

    this.documentoService.delete$(id).subscribe({
      next: () => {
        alert('Documento eliminado correctamente.');
        this.router.navigate(['/ui-components/document']);
      },
      error: (error) => {
        console.error('Error eliminando documento:', error);
        alert('No se pudo eliminar el documento.');
        this.router.navigate(['/ui-components/document']);
      }
    });

  }
}
