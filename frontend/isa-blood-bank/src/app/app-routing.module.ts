import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CentersComponent } from './components/centers/centers.component';

const routes: Routes = [
  {path: 'centers', component: CentersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
