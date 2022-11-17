import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrudPropietariosComponent } from './crud-propietarios/crud-propietarios.component';
import { CrudMecanicosComponent } from './crud-mecanicos/crud-mecanicos.component';
import { CrudVehiculosComponent } from './crud-vehiculos/crud-vehiculos.component';
import { CrudSedesComponent } from './crud-sedes/crud-sedes.component';
import { CrudHistorialComponent } from './crud-historial/crud-historial.component';
import { CrudJefeOperacionesComponent } from './crud-jefe-operaciones/crud-jefe-operaciones.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import { LayoutComponent } from './layout/layout.component';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ContentComponent } from './layout/content/content.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogPropietariosComponent } from './crud-propietarios/dialog-propietarios/dialog-propietarios.component';
import { DialogMecanicosComponent } from './crud-mecanicos/dialog-mecanicos/dialog-mecanicos.component';
import { DialogJefeOperacionesComponent } from './crud-jefe-operaciones/dialog-jefe-operaciones/dialog-jefe-operaciones.component';
import { DialogHistorialComponent } from './crud-historial/dialog-historial/dialog-historial.component';
import { DialogSedesComponent } from './crud-sedes/dialog-sedes/dialog-sedes.component';
import { DialogVehiculosComponent } from './crud-vehiculos/dialog-vehiculos/dialog-vehiculos.component';

@NgModule({
  declarations: [
    AppComponent,
    CrudPropietariosComponent,
    CrudMecanicosComponent,
    CrudVehiculosComponent,
    CrudSedesComponent,
    CrudHistorialComponent,
    CrudJefeOperacionesComponent,
    LayoutComponent,
    ToolbarComponent,
    SidebarComponent,
    FooterComponent,
    ContentComponent,
    DialogPropietariosComponent,
    DialogMecanicosComponent,
    DialogJefeOperacionesComponent,
    DialogHistorialComponent,
    DialogSedesComponent,
    DialogVehiculosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatTableModule,
    MatToolbarModule,
    HttpClientModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
