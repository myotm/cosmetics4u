import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  MatInputModule, MatButtonModule, MatFormFieldModule, MatRadioModule, 
  MatDatepickerModule, MatNativeDateModule, MatMenuModule, MatToolbarModule, 
  MatCardModule, MatGridListModule, MatPaginatorModule, MatBottomSheetModule, 
  MatStepperModule, MatIconModule, MatDividerModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpService } from './services/api/http.service';
import { UserApiService, AuthService, ValidatorService, ProductApiService, ShoppingCartService, StorageService, LocalStorageService } from './services';
import { SignupComponent } from './components/auth/signup/signup.component';
import { HomepageComponent } from './components/home/homepage/homepage.component';
import { UploadpageComponent } from './components/admin/uploadpage/uploadpage.component';
import { ShoppingcartpageComponent } from './components/home/shoppingcartpage/shoppingcartpage.component';
import { ShopcartcomponentComponent } from './components/home/shopcartcomponent/shopcartcomponent.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'uploadpage', component: UploadpageComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: 'shoppingcartpage', component: ShoppingcartpageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomepageComponent,
    UploadpageComponent,
    ShoppingcartpageComponent,
    ShopcartcomponentComponent
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
    MatGridListModule,
    MatPaginatorModule,
    MatBottomSheetModule,
    MatStepperModule,
    MatDividerModule,
    MatIconModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  providers: [ HttpService, UserApiService, ValidatorService, 
    AuthService, ProductApiService, ShoppingCartService, 
    { provide: StorageService, useClass: LocalStorageService  }, 
    {
      deps: [StorageService, ProductApiService],
      provide: ShoppingCartService,
      useClass: ShoppingCartService
    } 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
