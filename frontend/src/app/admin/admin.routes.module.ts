import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductsComponent } from './components/products/products.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { RoutinesComponent } from './components/routines/routines.component';
import { UsersComponent } from './components/users/users.component';
import { ConflictsComponent } from './components/conflicts/conflicts.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'questions', component: QuestionsComponent },
      { path: 'routines', component: RoutinesComponent },
      { path: 'users', component: UsersComponent },
      { path: 'conflicts', component: ConflictsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}