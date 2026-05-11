import { Routes } from '@angular/router';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadChildren: () =>
      import('./admin/admin.routes.module').then(m => m.AdminRoutingModule)
  },
  {
    path: '',
    loadChildren: () =>
      import('./user/user.routes.module').then(m => m.UserRoutingModule)
  }
];