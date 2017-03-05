import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SigninComponent } from './auth/signin.component';
import { HomeComponent } from './pages/home.component';
import { routing } from './app.routes';

import { AuthGuard } from './_guards/auth.guard';
import { AlertService, AuthenticationService, UserService } from './_services/index';
import { HeaderComponent } from './commons/header.component';
import { AlertComponent } from './commons/alert.component';
import { SignupComponent } from './auth/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    HomeComponent,
    HeaderComponent,
    AlertComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [AlertService, AuthenticationService, UserService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
