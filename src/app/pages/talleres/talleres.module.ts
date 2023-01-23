// @ts-ignore
import { NgModule } from '@angular/core';
// @ts-ignore
import { CommonModule } from '@angular/common';
import { TalleresComponent } from './talleres.component';
import {TalleresRoutingModule} from "./talleres-routing.module";
// @ts-ignore
import {FormsModule} from "@angular/forms";



// @ts-ignore
@NgModule({
  declarations: [
    TalleresComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TalleresRoutingModule
  ]
})
export class TalleresModule { }
