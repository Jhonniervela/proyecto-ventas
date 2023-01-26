import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {MainPageComponent} from "./core/main-page/main-page.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import {LoginComponent} from "./pages/login/login.component";


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

      {path: 'talleres',
      loadChildren: () => import('./pages/talleres/talleres.module')
        .then(m => m.TalleresModule)
    }]
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: "full"
  },


  {
    path: '**',
    redirectTo: '',

  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
