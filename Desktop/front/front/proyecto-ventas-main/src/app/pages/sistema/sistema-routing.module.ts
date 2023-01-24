import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import { MaterialesComponent } from "./materiales/materiales.component";
import { PersonasComponent } from "./personas/personas.component";
import { ProgramasComponent } from "./programas/programas.component";
import { TallerComponent } from "./taller/taller.component";
import {SistemaComponent} from "./sistema.component";

const routes: Routes = [
  {
    path: '',
    component: SistemaComponent,
    children: [
      {
      path: 'taller',
      component: TallerComponent
      },
      {
        path: 'materiales',
        component: MaterialesComponent
      },
      {
        path: 'programas',
        component: ProgramasComponent
      },
      {
        path: 'personas',
        component: PersonasComponent
      }]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SistemaRoutingModule {
}
