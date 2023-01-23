import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonasComponent } from './personas.component';
import {PersonasRoutingModule} from "./personas-routing.module";
import {PersonaService} from "../../../providers/services/persona.service";

@NgModule({
  declarations: [
    PersonasComponent
  ],
  imports: [
    CommonModule,
    PersonasRoutingModule
  ],
  providers: [
    PersonaService
  ]
})
export class PersonasModule { }
