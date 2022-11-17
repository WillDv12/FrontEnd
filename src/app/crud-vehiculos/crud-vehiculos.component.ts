import { Component, OnInit } from '@angular/core';
import { RequestBackendService } from './../request-backend.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'crud-vehiculos',
  templateUrl: './crud-vehiculos.component.html',
  styleUrls: ['./crud-vehiculos.component.scss'],
})
export class CrudVehiculosComponent implements OnInit {
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  disableSelect = new FormControl(false);

  selected1 = '';
  selected2 = '';
  selected3 = '';
  selected4 = '';

  modeForm = 'adicion';
  showForm = false;
  value = '';

  displayedColumns: string[] = [
    'placa',
    'tipo',
    'marca',
    'anio',
    'capacidadPasajeros',
    'cilindraje',
    'paisOrigen',
    'acciones',
  ];
  dataSource: any = [];

  formVehiculos: FormGroup = new FormGroup({});

  constructor(
    private servicioBackend: RequestBackendService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.getUsers();

    this.formVehiculos = this.fb.group({
      placa: [''],
      tipo: [''],
      marca: [''],
      anio: [''],
      capacidadPasajeros: [''],
      cilindraje: [''],
      paisOrigen: [''],
      caracteristica: [''],
      descripcion: [''],
      sedeId: ['636fc9860d935d1bbc693bca'],
      propietarioId: ['333333'],
      mecanicoId: ['222222'],
    });
  }

  getUsers(): void {
    this.servicioBackend.getData('vehiculos').subscribe(
      (data) => {
        this.dataSource = data;
      },
      (error) => {
        console.log(error);
        this.dataSource = [];
      }
    );
  }

  saveVehiculo(): void {
    const datosUser = this.formVehiculos.getRawValue();

    this.servicioBackend
      .postData('vehiculos', JSON.stringify(datosUser))
      .subscribe({
        next: (data) => {
          console.log(data);
          this.getUsers();
          Swal.fire('Vehiculo Creado Satisfactoriamente');
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
        this.servicioBackend.deleteData('vehiculos', code).subscribe({
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
    this.formVehiculos.patchValue(user);
  }

  filtrar() {
    this.servicioBackend
      .getDataFilter('vehiculos', this.value, 'placa')
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
    const newData = this.formVehiculos.getRawValue();

    this.servicioBackend
      .updateData('vehiculos', newData.placa, newData)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.getUsers();
          Swal.fire('Vehiculo Actualizado Satisfactoriamente');
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
