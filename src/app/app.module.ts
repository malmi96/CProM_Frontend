import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

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
import { PaymentComponent } from './payments/payment/payment.component';
import { InfoDialogComponent } from './dialogs/info/info-dialog/info-dialog.component';
import { MaterialService } from './services/material/material.service';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
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
import { ProjectService } from './services/project/project.service';
import { EditProjectComponent } from './project/edit-project/edit-project.component';
import { StageComponentComponent } from './stage/stage-component/stage-component.component';
import { LabourDialogComponent } from './dialogs/labour/labour-dialog/labour-dialog.component';
import { DataAddDialogComponent } from './dialogs/success/data-add-dialog/data-add-dialog.component';
import { StageService } from './services/stage/stage.service';
import { FoundationStageComponent } from './stage/foundation-stage/foundation-stage.component';
import { BrickworkStageComponent } from './stage/brickwork-stage/brickwork-stage.component';
import { RoofingStageComponent } from './stage/roofing-stage/roofing-stage.component';
import { PaintingStageComponent } from './stage/painting-stage/painting-stage.component';
import { ImageUploadComponent } from './dialogs/image/image-upload/image-upload.component';
import { EditMaterialComponent } from './dialogs/edit-material/edit-material.component';
import { EditSupplierComponent } from './dialogs/edit-supplier/edit-supplier.component';
import { MachineryTypeComponent } from './dialogs/machinery-type/machinery-type.component';
import { EditMachineryComponent } from './dialogs/edit-machinery/edit-machinery.component';
import { ViewPaymentsComponent } from './payments/view-payments/view-payments.component';
import { CustomerViewPaymentsComponent } from './payments/view-payments/customer-view-payments/customer-view-payments.component';
import { LabourViewPaymentsComponent } from './payments/view-payments/labour-view-payments/labour-view-payments.component';
import { MaterialViewPaymentsComponent } from './payments/view-payments/material-view-payments/material-view-payments.component';
import { MachineryViewPaymentsComponent } from './payments/view-payments/machinery-view-payments/machinery-view-payments.component';
import { UtilityViewPaymentsComponent } from './payments/view-payments/utility-view-payments/utility-view-payments.component';
import { CustomerEditPaymentComponent } from './dialogs/customer-edit-payment/customer-edit-payment.component';
import { LabourEditPaymentComponent } from './dialogs/labour-edit-payment/labour-edit-payment.component';
import { MaterialEditPaymentComponent } from './dialogs/material-edit-payment/material-edit-payment.component';
import { MachineryEditPaymentComponent } from './dialogs/machinery-edit-payment/machinery-edit-payment.component';
import { UtilityEditPaymentComponent } from './dialogs/utility-edit-payment/utility-edit-payment.component';
import { MaterialAllocationViewComponent } from './dialogs/material-allocation-view/material-allocation-view.component';
import { ByProjectComponent } from './material-handling/material-allocation/by-project/by-project.component';
import { ByMaterialComponent } from './material-handling/material-allocation/by-material/by-material.component';
import { AllocationLogComponent } from './material-handling/material-allocation/allocation-log/allocation-log.component';
import { ConsumptionByProjectComponent } from './material-handling/material-consumption/consumption-by-project/consumption-by-project.component';
import { ConsumptionByStageComponent } from './material-handling/material-consumption/consumption-by-stage/consumption-by-stage.component';
import { ConsumptionByMaterialComponent } from './material-handling/material-consumption/consumption-by-material/consumption-by-material.component';
import { ConsumptionLogComponent } from './material-handling/material-consumption/consumption-log/consumption-log.component';
import { MaterialConsumptionViewComponent } from './dialogs/material-consumption-view/material-consumption-view.component';
import { MaterialWarningComponent } from './dialogs/warnings/material-warning/material-warning.component';
import { InquiryComponent } from './dialogs/inquiry/inquiry.component';

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
    PaymentComponent,
    InfoDialogComponent,
    CustomerPaymentsComponent,
    MaterialPaymentsComponent,
    MachineryPaymentsComponent,
    UtilityPaymentsComponent,
    LabourPaymentsComponent,
    ToolsPaymentsComponent,
    ProjectComponent,
    AddProjectComponent,
    ViewProjectComponent,
    CustomerViewComponent,
    EmployeeViewComponent,
    UserViewComponent,
    EmployeeEditComponent,
    UserEditComponent,
    CustomerEditComponent,
    EditProjectComponent,
    StageComponentComponent,
    LabourDialogComponent,
    DataAddDialogComponent,
    FoundationStageComponent,
    BrickworkStageComponent,
    RoofingStageComponent,
    PaintingStageComponent,
    ImageUploadComponent,
    EditMaterialComponent,
    EditSupplierComponent,
    MachineryTypeComponent,
    EditMachineryComponent,
    ViewPaymentsComponent,
    CustomerViewPaymentsComponent,
    LabourViewPaymentsComponent,
    MaterialViewPaymentsComponent,
    MachineryViewPaymentsComponent,
    UtilityViewPaymentsComponent,
    CustomerEditPaymentComponent,
    LabourEditPaymentComponent,
    MaterialEditPaymentComponent,
    MachineryEditPaymentComponent,
    UtilityEditPaymentComponent,
    MaterialAllocationViewComponent,
    ByProjectComponent,
    ByMaterialComponent,
    AllocationLogComponent,
    ConsumptionByProjectComponent,
    ConsumptionByStageComponent,
    ConsumptionByMaterialComponent,
    ConsumptionLogComponent,
    MaterialConsumptionViewComponent,
    MaterialWarningComponent,
    InquiryComponent,
  ],
  imports: [
    MDBBootstrapModule.forRoot(),
    NgxEchartsModule.forRoot({ echarts }),
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatTableModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
  ],

  entryComponents: [
    DialogComponent,
    InfoDialogComponent,
    LabourDialogComponent,
    DataAddDialogComponent,
    ImageUploadComponent,
    EditMaterialComponent,
    EditSupplierComponent,
    MachineryTypeComponent,
    EditMachineryComponent,
    CustomerEditPaymentComponent,
    MaterialAllocationViewComponent,
    MaterialWarningComponent,
    InquiryComponent,
  ],
  providers: [
    UserService,
    DialogService,
    SupplierService,
    MaterialService,
    ProjectService,
    StageService,
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
