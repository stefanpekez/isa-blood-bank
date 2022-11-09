import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CenterCreateComponent } from './components/centers/center-create/center-create.component';
import { CentersComponent } from './components/centers/centers.component';

const routes: Routes = [
  {path: 'centers/create', component: CenterCreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
