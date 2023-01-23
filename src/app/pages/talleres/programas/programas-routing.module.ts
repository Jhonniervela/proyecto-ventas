// @ts-ignore
import {NgModule} from "@angular/core";
// @ts-ignore
import {RouterModule, Routes} from "@angular/router";
import {ProgramasComponent} from "./programas.component";

const routes: Routes = [
  {
    path: '',
    component: ProgramasComponent
  }
]
// @ts-ignore
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramasRoutingModule {
}
