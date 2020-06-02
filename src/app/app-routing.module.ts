import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { UserRegisterComponent } from './auth/user-register/user-register.component';
import { CustomerRegisterComponent } from './auth/user-register/customer-register/customer-register.component';
import { EmployeeRegisterComponent } from './auth/user-register/employee-register/employee-register.component';
import { MaterialHandlingComponent } from './material-handling/material-handling.component';
import { AddMaterialComponent } from './material-handling/add-material/add-material.component';
import { ViewMaterialComponent } from './material-handling/view-material/view-material.component';
import { MaterialAllocationComponent } from './material-handling/material-allocation/material-allocation.component';
import { MaterialConsumptionComponent } from './material-handling/material-consumption/material-consumption.component';
import { MachineryComponent } from './machinery/machinery.component';
import { AddMachineryComponent } from './machinery/add-machinery/add-machinery.component';
import { ViewMachineryComponent } from './machinery/view-machinery/view-machinery.component';
import { SupplierComponent } from './supplier/supplier.component';
import { AddSupplierComponent } from './supplier/add-supplier/add-supplier.component';
import { ViewSupplierComponent } from './supplier/view-supplier/view-supplier.component';
import { LabourComponent } from './labour/labour.component';
import { AddLabourComponent } from './labour/add-labour/add-labour.component';
import { ViewLabourComponent } from './labour/view-labour/view-labour.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { RoleGuard } from './auth/role.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'userRegister',
    component: UserRegisterComponent,
    canActivate: [AuthGuard, RoleGuard],
    children: [
      { path: 'customer', component: CustomerRegisterComponent },
      { path: 'employee', component: EmployeeRegisterComponent },
    ],
  },
  {
    path: 'material',
    component: MaterialHandlingComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'add', component: AddMaterialComponent },
      { path: 'view', component: ViewMaterialComponent },
      { path: 'allocation', component: MaterialAllocationComponent },
      { path: 'consumption', component: MaterialConsumptionComponent },
    ],
  },
  {
    path: 'machinery',
    component: MachineryComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'add', component: AddMachineryComponent },
      { path: 'view', component: ViewMachineryComponent },
    ],
  },
  {
    path: 'supplier',
    component: SupplierComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'add', component: AddSupplierComponent },
      { path: 'view', component: ViewSupplierComponent },
    ],
  },
  {
    path: 'labour',
    component: LabourComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'add', component: AddLabourComponent },
      { path: 'view', component: ViewLabourComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, RoleGuard],
})
export class AppRoutingModule {}
