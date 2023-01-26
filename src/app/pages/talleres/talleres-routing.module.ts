import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {TalleresComponent} from "./talleres.component";
import {ProgramasComponent} from "./programas/programas.component";
import {TallerComponent} from "./taller/taller.component";
import {ClientesComponent} from "./clientes/clientes.component";
import {CajaComponent} from "./caja/caja.component";
import {CategoriaComponent} from "../categoria/categoria.component";


const routes: Routes = [
  {
    path: '',
    component: TalleresComponent,
    children: [

      {
      path: 'taller',
      component:TallerComponent
      },

      {
        path: 'programas',
        component:ProgramasComponent
      },
      {
        path: 'categoria',
        component:CategoriaComponent
      },

      {
        path: 'clientes',
        component:ClientesComponent
      },
      {
        path: 'caja',
        component: CajaComponent
      }]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TalleresRoutingModule {
}
