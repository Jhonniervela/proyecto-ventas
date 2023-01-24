import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {MainPageComponent} from "./core/main-page/main-page.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      {
      path: '',
      component: DashboardComponent,
      pathMatch: "full"
      },

      {
      path: 'sistema',
      loadChildren: () => import('./pages/sistema/sistema.module')
      .then(m => m.SistemaModule)
    }]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
