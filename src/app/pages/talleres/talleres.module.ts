
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TalleresComponent } from './talleres.component';
import {TalleresRoutingModule} from "./talleres-routing.module";
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProgramasComponent} from "./programas/programas.component";
import {TallerComponent} from "./taller/taller.component";
import {ProgramaModalComponent} from "./programas/programa-modal/programa-modal.component";
import {ClientesComponent} from "./clientes/clientes.component";
import {CajaComponent} from "./caja/caja.component";
import {CajaModalComponent} from "./caja/caja-modal/caja-modal.component";
import {ClientesModalComponent} from "./clientes/clientes-modal/clientes-modal.component";
import {LoginComponent} from "../login/login.component";
import {CategoriaComponent} from "../categoria/categoria.component";
import {CategoriaModalComponent} from "../categoria/categoria-modal/categoria-modal.component";





@NgModule({
  declarations: [
    TalleresComponent,
    ProgramasComponent,
    TallerComponent,
    CajaComponent,
    ProgramaModalComponent,
    CajaModalComponent,
    ClientesComponent,
    ClientesModalComponent,
    LoginComponent,
    CategoriaComponent,
    CategoriaModalComponent




  ],
  imports: [
    CommonModule,
    FormsModule,
    TalleresRoutingModule,
    ReactiveFormsModule,

  ]
})
export class TalleresModule { }
