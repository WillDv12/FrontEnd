import { Component, OnInit } from '@angular/core';
import { RequestBackendService } from './../request-backend.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { DialogPropietariosComponent } from './dialog-propietarios/dialog-propietarios.component';
import { format } from 'date-fns';

@Component({
  selector: 'crud-propietarios',
  templateUrl: './crud-propietarios.component.html',
  styleUrls: ['./crud-propietarios.component.scss'],
})
export class CrudPropietariosComponent implements OnInit {

  modeForm = 'adicion';
  showForm = false;
  value = '';

  displayedColumns: string[] = [
    'cedulaPropietario',
    'nombre',
    'apellido',
    'telefono',
    'fechaNacimiento',
    'ciudadResidencia',
    'correo',
    'acciones',
  ];
  dataSource: any = [];

  formUser: FormGroup = new FormGroup({});

  constructor(
    private servicioBackend: RequestBackendService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.getUsers();

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

  getUsers(): void {
    this.servicioBackend.getData('propietarios').subscribe(
      (data) => {
        this.dataSource = data;
      },
      (error) => {
        console.log(error);
        this.dataSource = [];
      }
    );
  }

  saveUser(): void {
    const datosUser = this.formUser.getRawValue();
    datosUser['fechaNacimiento'] = new Date(datosUser['fechaNacimiento']);

    this.servicioBackend
      .postData('propietarios', JSON.stringify(datosUser))
      .subscribe({
        next: (data) => {
          console.log(data);
          this.getUsers();
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

  deleteUser(code: string): void {
    console.log(code);

    Swal.fire({
      title: '¿Desea Eliminar Al Usuario?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      // denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.servicioBackend.deleteData('propietarios', code).subscribe({
          next: (data) => {
            console.log(data);
            this.getUsers();
            Swal.fire('Ok!', 'Eliminado', 'success');
          },
          error: (error) => {
            console.log(error);
            Swal.fire('Usuario NO eliminado', 'Ocurrió un error', 'error');
          },
          complete: () => {
            console.log('complete');
          },
        });
      }
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

  openDialog() {
    this.dialog.open(DialogPropietariosComponent);
  }

  setFormat(dateString: string): string {
    const date = new Date(dateString);
    const newDate = format(date, 'd-LLL-yyyy');
    return newDate;
  }

  filtrar() {
    this.servicioBackend
      .getDataFilter('propietarios', this.value, 'nombre')
      .subscribe(
        (data) => {
          this.dataSource = data;
        },
        (error) => {
          console.log(error);
          this.dataSource = [];
        }
      );
  }

  updateUser(): void { 
    const newData = this.formUser.getRawValue();
    newData['fechaNacimiento'] = new Date(newData['fechaNacimiento']);
    
    this.servicioBackend
      .updateData('propietarios', newData.cedulaPropietario, newData)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.getUsers();
          Swal.fire('Usuario Actualizado Satisfactoriamente');
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          console.log('complete');
        },
      });
  }
  
  ngOnInit(): void {}
}
