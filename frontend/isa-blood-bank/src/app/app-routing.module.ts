import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CenterCreateComponent } from './components/centers/center-create/center-create.component';
import { CentersComponent } from './components/centers/centers.component';
import { CenterAdminCreateComponent } from './components/users/center-admin-create/center-admin-create.component';
import { ProfileViewComponent } from './components/users/profile-view/profile-view.component';
import { UsersComponent } from './components/users/users.component';
import { QuestionnairesComponent } from './components/questionnaires/questionnaires.component';
import { RegisterRegularComponent } from './components/users/register-regular/register-regular.component';
import { CenterUpdateComponent } from './components/centers/center-update/center-update.component';
import { LoginComponent } from './components/users/login/login.component';
import { WorkCalendarsComponent } from './components/work-calendars/work-calendars.component';
import { AuthGuardService as AuthGuard } from './components/users/shared/auth-guard.service';
import { ActivateComponent } from './components/users/activate/activate.component';
import { AdminRegistrationComponent } from './components/users/admin-registration/admin-registration.component';
import { SystemAdminCreateComponent } from './components/users/system-admin-create/system-admin-create.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { SystemAdminPassChangeComponent } from './components/users/system-admin-pass-change/system-admin-pass-change.component';

const routes: Routes = [
  {path: 'centers/create', component: CenterCreateComponent, canActivate: [AuthGuard]},
  {path: 'questionnaires', component: QuestionnairesComponent, canActivate: [AuthGuard]},
  {path: 'users/profile-view/:id' , component: ProfileViewComponent, canActivate: [AuthGuard]},
  {path: 'users/create/center', component: CenterAdminCreateComponent, canActivate: [AuthGuard]},
  {path: 'users/create/system', component: SystemAdminCreateComponent, canActivate: [AuthGuard]},
  {path: 'users/register', component: RegisterRegularComponent},
  {path: 'users/login', component: LoginComponent},
  {path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  {path: 'centers/create', component: CenterCreateComponent, canActivate: [AuthGuard]},
  {path: 'centers/view/:id' , component: CenterUpdateComponent, canActivate: [AuthGuard]},
  {path: '', component: CentersComponent},
  {path: 'work-calendar' , component: WorkCalendarsComponent, canActivate: [AuthGuard]},
  {path: 'users', component: UsersComponent},
  {path: 'centers/create', component: CenterCreateComponent},
  {path: 'centers/view/:id' , component: CenterUpdateComponent},
  {path: 'activate/:id', component: ActivateComponent},
  {path: '', component: CentersComponent},
  {path: 'users/create', component: AdminRegistrationComponent, canActivate: [AuthGuard]},
  {path: 'work-calendar' , component: WorkCalendarsComponent},
  {path: 'appointments', component: AppointmentsComponent},
  {path: 'pass-change', component: SystemAdminPassChangeComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
