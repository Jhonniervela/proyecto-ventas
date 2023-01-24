// @ts-ignore
import { NgModule } from '@angular/core';
// @ts-ignore
import { CommonModule } from '@angular/common';
import { SistemaComponent } from './sistema.component';
import {SistemaRoutingModule} from "./sistema-routing.module";
// @ts-ignore
import {FormsModule} from "@angular/forms";
import { ProgramasComponent } from './programas/programas.component';
import { TallerComponent } from './taller/taller.component';




// @ts-ignore
@NgModule({
  declarations: [

    SistemaComponent,
    ProgramasComponent,
    TallerComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    SistemaRoutingModule
  ]
})
export class SistemaModule { }
