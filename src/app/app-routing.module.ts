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
import { AuthGuard } from './auth/auth.guard';
import { RoleGuard } from './auth/role.guard';
import { PaymentComponent } from './payments/payment/payment.component';
import { CustomerPaymentsComponent } from './payments/customer/customer-payments/customer-payments.component';
import { MaterialPaymentsComponent } from './payments/material/material-payments/material-payments.component';
import { MachineryPaymentsComponent } from './payments/machinery/machinery-payments/machinery-payments.component';
import { UtilityPaymentsComponent } from './payments/utility/utility-payments/utility-payments.component';
import { LabourPaymentsComponent } from './payments/labour/labour-payments/labour-payments.component';
import { ToolsPaymentsComponent } from './payments/tools/tools-payments/tools-payments.component';
import { ProjectComponent } from './project/project/project.component';
import { AddProjectComponent } from './project/add-project/add-project.component';
import { ViewProjectComponent } from './project/view-project/view-project.component';
import { CustomerViewComponent } from './auth/user-view/customer-view/customer-view.component';
import { EmployeeViewComponent } from './auth/user-view/employee-view/employee-view.component';
import { UserViewComponent } from './auth/user-view/user-view.component';
import { EmployeeEditComponent } from './auth/user-edit/employee-edit/employee-edit.component';
import { UserEditComponent } from './auth/user-edit/user-edit.component';
import { CustomerEditComponent } from './auth/user-edit/customer-edit/customer-edit.component';
import { EditProjectComponent } from './project/edit-project/edit-project.component';
import { StageComponentComponent } from './stage/stage-component/stage-component.component';
import { ViewPaymentsComponent } from './payments/view-payments/view-payments.component';
import { ViewInquiryComponent } from './inquiry/view-inquiry/view-inquiry.component';
import { ViewProjectDuplicateComponent } from './project/view-project-duplicate/view-project-duplicate.component';
import { PaymentAnalysisComponent } from './payments/payment-analysis/payment-analysis.component';
import { ReportsComponent } from './reports/reports.component';
import { GalleryComponent } from './gallery/gallery.component';
import { GanttChartComponent } from './gantt-chart/gantt-chart.component';
import { ProjectManagaerDashboardComponent } from './project-managaer-dashboard/project-managaer-dashboard.component';
import { InventoryManagerDashboardComponent } from './inventory-manager-dashboard/inventory-manager-dashboard.component';
import { FinanceManagerDashboardComponent } from './finance-manager-dashboard/finance-manager-dashboard.component';
import { SalesManagerDashboardComponent } from './sales-manager-dashboard/sales-manager-dashboard.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'gantt', component: GanttChartComponent },
  {
    path: 'inquiry',
    component: ViewInquiryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'gallery',
    component: GalleryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'report',
    component: ReportsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'viewProject',
    component: ViewProjectDuplicateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    component: ProjectManagaerDashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'inventoryDashboard',
    component: InventoryManagerDashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'financeDashboard',
    component: FinanceManagerDashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'salesDashboard',
    component: SalesManagerDashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'customerDashboard',
    component: CustomerDashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'project',
    component: ProjectComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'add', component: AddProjectComponent },
      { path: 'view', component: ViewProjectComponent },
    ],
  },
  {
    path: 'stage',
    component: StageComponentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'editProject/:id',
    component: EditProjectComponent,
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
    path: 'viewUser',
    component: UserViewComponent,
    canActivate: [AuthGuard, RoleGuard],
    children: [
      {
        path: 'viewEmployee',
        component: EmployeeViewComponent,
      },
      {
        path: 'viewCustomer',
        component: CustomerViewComponent,
      },
    ],
  },
  {
    path: 'userEdit',
    component: UserEditComponent,
    canActivate: [AuthGuard, RoleGuard],
    children: [
      { path: ':id', component: EmployeeEditComponent },
      { path: 'customer/:id', component: CustomerEditComponent },
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
  {
    path: 'payments',
    component: PaymentComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'customerPayments', component: CustomerPaymentsComponent },
      { path: 'materialPayments', component: MaterialPaymentsComponent },
      { path: 'machineryPayments', component: MachineryPaymentsComponent },
      { path: 'utilityPayments', component: UtilityPaymentsComponent },
      { path: 'labourPayments', component: LabourPaymentsComponent },
      { path: 'view', component: ViewPaymentsComponent },
      { path: 'analysis', component: PaymentAnalysisComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, RoleGuard],
})
export class AppRoutingModule {}
