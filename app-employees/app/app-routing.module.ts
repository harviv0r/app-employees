import {
  NgModule
} from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
import {
  DashboardComponent
} from './dashboard/dashboard.component';
import {
  NotFoundComponent
} from './not-found/not-found.component';
import {
  SignInComponent
} from './sign-in/sign-in.component';
import {
  SignUpComponent
} from './sign-up/sign-up.component';


import {
  AuthGuard
} from './guard/auth.guard';
import {
  EmployeesComponent
} from './employees/employees.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';


const routes: Routes = [{
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'dashboard',
    redirectTo: 'dashboard/employees'
  },
  
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'employees',
        component: EmployeesComponent
      },
      {
        path: 'employees/edit-employee/:id',
        component: EditEmployeeComponent
      },
    ]
  },

  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'not-found',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
