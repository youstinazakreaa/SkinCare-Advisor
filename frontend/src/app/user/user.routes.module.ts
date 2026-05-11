import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SkinanalysisComponent } from './components/skinanalysis/skinanalysis.component';
import { ProductsComponent } from './components/products/products.component';
import { RoutineComponent } from './components/routine/routine.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ErrorComponent } from './shared/error/error.component';

import { authGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      { path: '', component: HomeComponent, data: { animation: 'HomePage' } },
      { path: 'login', component: LoginComponent, data: { animation: 'LoginPage' } },
      { path: 'register', component: RegisterComponent, data: { animation: 'RegisterPage' } },

      {
        path: 'analysis',
        component: SkinanalysisComponent,
        canActivate: [authGuard],
        data: { animation: 'AnalysisPage' }
      },
      {
        path: 'products',
        component: ProductsComponent,
        canActivate: [authGuard],
        data: { animation: 'ProductsPage' }
      },
      {
        path: 'routine',
        component: RoutineComponent,
        canActivate: [authGuard],
        data: { animation: 'RoutinePage' }
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard],
        data: { animation: 'DashboardPage' }
      },

      { path: '**', component: ErrorComponent, data: { animation: 'ErrorPage' } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}