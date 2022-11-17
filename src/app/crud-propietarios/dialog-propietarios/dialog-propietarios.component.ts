import { Component, OnInit } from '@angular/core';
import { RequestBackendService } from '../../request-backend.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-propietarios',
  templateUrl: './dialog-propietarios.component.html',
  styleUrls: ['./dialog-propietarios.component.scss'],
})
export class DialogPropietariosComponent implements OnInit {
  modeForm = 'adicion';
  showForm = false;
  formUser: FormGroup = new FormGroup({});

  constructor(
    private servicioBackend: RequestBackendService,
    private fb: FormBuilder
  ) {
    this.formUser = this.fb.group({
      cedulaPropietario: [''],
      nombre: [''],
      apellido: [''],
      telefono: [''],
      fechaNacimiento: [''],
      contrasenia: [''],
      ciudadResidencia: [''],
      correo: [''],
      sedeId: ['636fc9860d935d1bbc693bca'],
    });
  }

  saveUser(): void {
    const datosUser = this.formUser.getRawValue();
    datosUser['fechaNacimiento'] = new Date(datosUser['fechaNacimiento']);

    this.servicioBackend
      .postData('propietarios', JSON.stringify(datosUser))
      .subscribe({
        next: (data) => {
          console.log(data);
          Swal.fire('Usuario Creado Satisfactoriamente');
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          console.log('complete');
        },
      });
  }

  changeShowForm() {
    this.modeForm = 'adicion';
    this.showForm = !this.showForm;
  }
  selectUserEdit(user: any): void {
    this.showForm = true;
    this.modeForm = 'edicion';
    this.formUser.patchValue(user);
  }

  updateUser(): void {}

  ngOnInit(): void {}
}
