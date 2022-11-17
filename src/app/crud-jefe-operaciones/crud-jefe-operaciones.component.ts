import { Component, OnInit } from '@angular/core';
import { RequestBackendService } from './../request-backend.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { format } from 'date-fns';

@Component({
  selector: 'crud-jefe-operaciones',
  templateUrl: './crud-jefe-operaciones.component.html',
  styleUrls: ['./crud-jefe-operaciones.component.scss'],
})
export class CrudJefeOperacionesComponent implements OnInit {
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  modeForm = 'adicion';
  showForm = false;
  value = '';

  displayedColumns: string[] = [
    'cedulaJefeOperaciones',
    'nombre',
    'apellido',
    'telefono',
    'fechaNacimiento',
    'direccion',
    'nivelEstudio',
    'acciones',
  ];
  dataSource: any = [];

  formJefeOperaciones: FormGroup = new FormGroup({});

  constructor(
    private servicioBackend: RequestBackendService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.getUsers();

    this.formJefeOperaciones = this.fb.group({
      cedulaJefeOperaciones: [''],
      nombre: [''],
      apellido: [''],
      telefono: [''],
      fechaNacimiento: [''],
      contrasenia: [''],
      direccion: [''],
      nivelEstudio: [''],
      sedeId: ['636fc9860d935d1bbc693bca'],
    });
  }

  ngOnInit(): void {}

  getUsers(): void {
    this.servicioBackend.getData('jefe-operaciones').subscribe(
      (data) => {
        this.dataSource = data;
      },
      (error) => {
        console.log(error);
        this.dataSource = [];
      }
    );
  }

  saveJefeOperaciones(): void {
    const datosUser = this.formJefeOperaciones.getRawValue();
    datosUser['fechaNacimiento'] = new Date(datosUser['fechaNacimiento']);

    this.servicioBackend
      .postData('jefe-operaciones', JSON.stringify(datosUser))
      .subscribe({
        next: (data) => {
          console.log(data);
          this.getUsers();
          Swal.fire('Jefe Creado Satisfactoriamente');
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
        this.servicioBackend.deleteData('jefe-operaciones', code).subscribe({
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
    this.formJefeOperaciones.patchValue(user);
  }

  setFormat(dateString: string): string {
    const date = new Date(dateString);
    const newDate = format(date, 'd-LLL-yyyy');
    return newDate;
  }

  filtrar() {
    this.servicioBackend
      .getDataFilter('jefe-operaciones', this.value, 'nombre')
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
    const newData = this.formJefeOperaciones.getRawValue();
    newData['fechaNacimiento'] = new Date(newData['fechaNacimiento']);

    this.servicioBackend
      .updateData('jefe-operaciones', newData.cedulaJefeOperaciones, newData)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.getUsers();
          Swal.fire('Mecanico Actualizado Satisfactoriamente');
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          console.log('complete');
        },
      });
  }
}
