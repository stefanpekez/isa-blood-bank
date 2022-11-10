import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CenterCreateComponent } from './components/centers/center-create/center-create.component';
import { CenterAdminCreateComponent } from './components/users/center-admin-create/center-admin-create.component';
import { ProfileViewComponent } from './components/users/profile-view/profile-view.component';

const routes: Routes = [
  {path: 'centers/create', component: CenterCreateComponent},
  {path: 'users/profile-view/:id' , component: ProfileViewComponent},
  {path: 'users/create', component: CenterAdminCreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
