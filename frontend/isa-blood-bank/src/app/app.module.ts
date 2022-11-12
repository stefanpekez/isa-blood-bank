import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { CentersComponent } from './components/centers/centers.component';
import { CenterCreateComponent } from './components/centers/center-create/center-create.component';
import { FormsModule } from '@angular/forms';
import { CenterUpdateComponent } from './components/centers/center-update/center-update.component';
import { UsersComponent } from './components/users/users.component';
import { ProfileViewComponent } from './components/users/profile-view/profile-view.component';
import { CenterAdminCreateComponent } from './components/users/center-admin-create/center-admin-create.component';
import { UserNameSurnameFilterPipe } from './shared/user-name-surname-filter.pipe';

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
    UserNameSurnameFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
