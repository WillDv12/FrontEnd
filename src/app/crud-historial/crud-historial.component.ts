import { Component, OnInit } from '@angular/core';
import { RequestBackendService } from './../request-backend.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { format } from 'date-fns';

@Component({
  selector: 'crud-historial',
  templateUrl: './crud-historial.component.html',
  styleUrls: ['./crud-historial.component.scss'],
})
export class CrudHistorialComponent implements OnInit {
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  modeForm = 'adicion';
  showForm = false;
  value = '';

  displayedColumns: string[] = ['fecha', 'estado', 'vehiculoId', 'acciones'];
  dataSource: any = [];

  formUser: FormGroup = new FormGroup({});

  constructor(
    private servicioBackend: RequestBackendService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.getUsers();

    this.formUser = this.fb.group({
      fecha: [''],
      estado: [''],
      vehiculoId: ['AAA-123'],
    });
  }

  getUsers(): void {
    this.servicioBackend.getData('historias').subscribe(
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
    datosUser['fecha'] = new Date(datosUser['fecha']);

    this.servicioBackend
      .postData('historias', JSON.stringify(datosUser))
      .subscribe({
        next: (data) => {
          console.log(data);
          this.getUsers();
          Swal.fire('Historia Creada Satisfactoriamente');
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
        this.servicioBackend.deleteData('historias', code).subscribe({
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

  setFormat(dateString: string): string {
    const date = new Date(dateString);
    const newDate = format(date, 'd-LLL-yyyy');
    return newDate;
  }

  filtrar() {
    this.servicioBackend
      .getDataFilter('historias', this.value, 'vehiculoId')
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

  }

  ngOnInit(): void {}
}
