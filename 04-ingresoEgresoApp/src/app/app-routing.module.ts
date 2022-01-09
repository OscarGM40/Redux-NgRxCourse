import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { AuthGuard } from "./guards/auth.guard";


const routes: Routes =
  [
    { path: 'login', component: LoginComponent,  },
    { path: 'register', component: RegisterComponent,  },
    {
      path: 'dashboard',
      // canActivate: [AuthGuard],
      canLoad: [AuthGuard],
      loadChildren: () => import('./ingreso-egreso/ingreso-egreso.module').then(m => m. IngresoEgresoModule)
    },
    { path: '**', pathMatch: 'full', redirectTo: 'login' }
  ];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }