import { Component, OnInit } from '@angular/core';
import { RequestBackendService } from './../request-backend.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { format } from 'date-fns';

@Component({
  selector: 'crud-mecanicos',
  templateUrl: './crud-mecanicos.component.html',
  styleUrls: ['./crud-mecanicos.component.scss'],
})
export class CrudMecanicosComponent implements OnInit {
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  modeForm = 'adicion';
  showForm = false;
  value = '';

  displayedColumns: string[] = [
    'cedulaMecanico',
    'nombre',
    'apellido',
    'telefono',
    'fechaNacimiento',
    'direccion',
    'nivelEstudio',
    'acciones',
  ];
  dataSource: any = [];

  formMecanico: FormGroup = new FormGroup({});

  constructor(
    private servicioBackend: RequestBackendService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.getUsers();

    this.formMecanico = this.fb.group({
      cedulaMecanico: [''],
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
    this.servicioBackend.getData('mecanicos').subscribe(
      (data) => {
        this.dataSource = data;
      },
      (error) => {
        console.log(error);
        this.dataSource = [];
      }
    );
  }

  saveMecanico(): void {
    const datosUser = this.formMecanico.getRawValue();
    datosUser['fechaNacimiento'] = new Date(datosUser['fechaNacimiento']);

    this.servicioBackend
      .postData('mecanicos', JSON.stringify(datosUser))
      .subscribe({
        next: (data) => {
          console.log(data);
          this.getUsers();
          Swal.fire('Mecanico Creado Satisfactoriamente');
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
        this.servicioBackend.deleteData('mecanicos', code).subscribe({
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
    this.formMecanico.patchValue(user);
  }

  setFormat(dateString: string): string {
    const date = new Date(dateString);
    const newDate = format(date, 'd-LLL-yyyy');
    return newDate;
  }

  filtrar() {
    this.servicioBackend
      .getDataFilter('mecanicos', this.value, 'nombre')
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
    const newData = this.formMecanico.getRawValue();
    newData['fechaNacimiento'] = new Date(newData['fechaNacimiento']);

    this.servicioBackend
      .updateData('mecanicos', newData.cedulaMecanico, newData)
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
