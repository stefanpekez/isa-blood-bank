import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { CentersComponent } from './components/centers/centers.component';

@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    NavbarComponent
=======
    NavbarComponent,
    CentersComponent

>>>>>>> 62c9ebe (Add centers page)
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
