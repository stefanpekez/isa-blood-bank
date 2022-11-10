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

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CentersComponent,
    CenterCreateComponent,
    CenterUpdateComponent
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
