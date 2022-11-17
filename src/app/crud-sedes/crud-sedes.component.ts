import { Component, OnInit } from '@angular/core';
import { RequestBackendService } from './../request-backend.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'crud-sedes',
  templateUrl: './crud-sedes.component.html',
  styleUrls: ['./crud-sedes.component.scss'],
})
export class CrudSedesComponent implements OnInit {
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  modeForm = 'adicion';
  showForm = false;
  value = '';

  displayedColumns: string[] = [
    'nombre',
    'departamento',
    'ciudad',
    'direccion',
    'telefono',
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
      nombre: [''],
      departamento: [''],
      ciudad: [''],
      direccion: [''],
      telefono: [''],
    });
  }

  getUsers(): void {
    this.servicioBackend.getData('sedes').subscribe(
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

    this.servicioBackend
      .postData('sedes', JSON.stringify(datosUser))
      .subscribe({
        next: (data) => {
          console.log(data);
          this.getUsers();
          Swal.fire('Sede Creada Satisfactoriamente');
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
      title: '¿Desea Eliminar La Sede?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      // denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.servicioBackend.deleteData('sedes', code).subscribe({
          next: (data) => {
            console.log(data);
            this.getUsers();
            Swal.fire('Ok!', 'Eliminado', 'success');
          },
          error: (error) => {
            console.log(error);
            Swal.fire('Sede NO eliminada', 'Ocurrió un error', 'error');
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

  filtrar() {
    this.servicioBackend.getDataFilter('sedes', this.value, 'nombre').subscribe(
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

    this.servicioBackend
      .updateData('sedes', newData.idSede, newData)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.getUsers();
          Swal.fire('Sede Actualizado Satisfactoriamente');
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
