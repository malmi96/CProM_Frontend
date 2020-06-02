import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

import { from } from 'rxjs';
import { UserRegisterComponent } from './auth/user-register/user-register.component';
import { CustomerRegisterComponent } from './auth/user-register/customer-register/customer-register.component';
import { EmployeeRegisterComponent } from './auth/user-register/employee-register/employee-register.component';
import { UserService } from './services/user/user.service';
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
import { AuthInterceptor } from './auth/auth-interceptor';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DialogComponent } from './dialogs/dialog/dialog.component';
import { DialogService } from './services/dialog/dialog.service';
import { SupplierService } from './services/supplier/supplier.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    UserRegisterComponent,
    CustomerRegisterComponent,
    EmployeeRegisterComponent,
    MaterialHandlingComponent,
    AddMaterialComponent,
    ViewMaterialComponent,
    MaterialAllocationComponent,
    MaterialConsumptionComponent,
    MachineryComponent,
    AddMachineryComponent,
    ViewMachineryComponent,
    SupplierComponent,
    AddSupplierComponent,
    ViewSupplierComponent,
    LabourComponent,
    AddLabourComponent,
    ViewLabourComponent,
    DashboardComponent,
    DialogComponent,
  ],
  imports: [
    MDBBootstrapModule.forRoot(),
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],

  entryComponents: [DialogComponent],
  providers: [
    UserService,
    DialogService,
    SupplierService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
