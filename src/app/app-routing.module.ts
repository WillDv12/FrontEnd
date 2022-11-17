import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudHistorialComponent } from './crud-historial/crud-historial.component';
import { CrudJefeOperacionesComponent } from './crud-jefe-operaciones/crud-jefe-operaciones.component';
import { CrudMecanicosComponent } from './crud-mecanicos/crud-mecanicos.component';
import { CrudPropietariosComponent } from './crud-propietarios/crud-propietarios.component';
import { CrudSedesComponent } from './crud-sedes/crud-sedes.component';
import { CrudVehiculosComponent } from './crud-vehiculos/crud-vehiculos.component';

const routes: Routes = [
  { path: '', component: CrudPropietariosComponent },
  { path: 'sedes', component: CrudSedesComponent },
  { path: 'jefeOperaciones', component: CrudJefeOperacionesComponent },
  { path: 'mecanicos', component: CrudMecanicosComponent },
  { path: 'propietarios', component: CrudPropietariosComponent },
  { path: 'vehiculos', component: CrudVehiculosComponent },
  { path: 'historial', component: CrudHistorialComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
