import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  MatInputModule, MatButtonModule, MatFormFieldModule, MatRadioModule, 
  MatDatepickerModule, MatNativeDateModule, MatMenuModule, MatToolbarModule, MatCardModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpService } from './services/api/http.service';
import { UserApiService } from './services/api/user-api.service';
import { ValidatorService } from './services/validator.service';
import { AuthService } from './services/auth/auth.service';
import { SignupComponent } from './components/auth/signup/signup.component';
import { HomepageComponent } from './components/home/homepage/homepage.component';
import { UploadpageComponent } from './components/admin/uploadpage/uploadpage.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'uploadpage', component: UploadpageComponent },
  { path: 'homepage', component: HomepageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomepageComponent,
    UploadpageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatToolbarModule,
    MatCardModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  providers: [ HttpService, UserApiService, ValidatorService, AuthService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
