import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CenterCreateComponent } from './components/centers/center-create/center-create.component';
import { CenterAdminCreateComponent } from './components/users/center-admin-create/center-admin-create.component';
import { ProfileViewComponent } from './components/users/profile-view/profile-view.component';
import { UsersComponent } from './components/users/users.component';
import { QuestionnairesComponent } from './components/questionnaires/questionnaires.component';
import { RegisterRegularComponent } from './components/users/register-regular/register-regular.component';
import { CenterUpdateComponent } from './components/centers/center-update/center-update.component';

const routes: Routes = [
  {path: 'centers/create', component: CenterCreateComponent},
  {path: 'questionnaires', component: QuestionnairesComponent},
  {path: 'users/profile-view/:id' , component: ProfileViewComponent},
  {path: 'users/create', component: CenterAdminCreateComponent},
  {path: 'users/register', component: RegisterRegularComponent},
  {path: 'users', component: UsersComponent},
  {path: 'centers/create', component: CenterCreateComponent},
  {path: 'centers/view/:id' , component: CenterUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
