import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CentersComponent } from './components/centers/centers.component';
import { CenterCreateComponent } from './components/centers/center-create/center-create.component';
import { FormsModule } from '@angular/forms';
import { CenterUpdateComponent } from './components/centers/center-update/center-update.component';
import { UsersComponent } from './components/users/users.component';
import { ProfileViewComponent } from './components/users/profile-view/profile-view.component';
import { CenterAdminCreateComponent } from './components/users/center-admin-create/center-admin-create.component';
import { UserNameSurnameFilterPipe } from './shared/user-name-surname-filter.pipe';
import { QuestionnairesComponent } from './components/questionnaires/questionnaires.component';
import { RegisterRegularComponent } from './components/users/register-regular/register-regular.component';
import { CenterNameAddressFilterPipe } from './shared/center-name-address-filter.pipe';
import { LoginComponent } from './components/users/login/login.component';
import { TokenInterceptor } from './components/users/shared/auth.interceptor';
import { WorkCalendarsComponent } from './components/work-calendars/work-calendars.component';
import { ActivateComponent } from './components/users/activate/activate.component';
import { SystemAdminCreateComponent } from './components/users/system-admin-create/system-admin-create.component';
import { AdminRegistrationComponent } from './components/users/admin-registration/admin-registration.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { SystemAdminPassChangeComponent } from './components/users/system-admin-pass-change/system-admin-pass-change.component';
import { CustomAlertComponent } from './shared/custom-alert/custom-alert.component';
import { AppointmentReviewComponent } from './components/appointment-review/appointment-review.component';
import { AppointmentProcessingComponent } from './components/appointment-review/appointment-processing/appointment-processing.component';
import { SchedulePredefinedComponent } from './components/appointments/schedule-predefined/schedule-predefined.component';
import { DefineRegularComponent } from './components/appointments/define-regular/define-regular.component';
import { AppointmentHistoryComponent } from './components/appointments/appointment-history/appointment-history.component';
import { InProgressInfoComponent } from './components/appointments/in-progress-info/in-progress-info.component';
import { InProgressEditComponent } from './components/appointments/in-progress-edit/in-progress-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CentersComponent,
    CenterCreateComponent,
    CenterUpdateComponent,
    UsersComponent,
    ProfileViewComponent,
    CenterAdminCreateComponent,
    UserNameSurnameFilterPipe,
    QuestionnairesComponent,
    RegisterRegularComponent,
    CenterNameAddressFilterPipe,
    LoginComponent,
    WorkCalendarsComponent,
    ActivateComponent,
    SystemAdminCreateComponent,
    AdminRegistrationComponent,
    AppointmentsComponent,
    SystemAdminPassChangeComponent,
    CustomAlertComponent,
    AppointmentReviewComponent,
    AppointmentProcessingComponent,
    SchedulePredefinedComponent,
    DefineRegularComponent,
    AppointmentHistoryComponent,
    InProgressInfoComponent,
    InProgressEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
