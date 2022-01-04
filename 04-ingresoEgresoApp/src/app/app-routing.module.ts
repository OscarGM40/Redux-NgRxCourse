import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { dashboardRoutes } from "./dashboard/dashboard.routes";
import { AuthGuard } from "./guards/auth.guard";
import { IsloggedGuard } from "./guards/islogged.guard";


const routes: Routes =
  [
    { path: 'login', component: LoginComponent,  },
    { path: 'register', component: RegisterComponent,  },
    {
      path: 'dashboard',
      component: DashboardComponent,
      children: dashboardRoutes,
      canActivate: [AuthGuard]
    },
    { path: '**', pathMatch: 'full', redirectTo: 'dashboard' }
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