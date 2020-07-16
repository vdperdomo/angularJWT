import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from '../components/login/login.component';
import { HomeComponent } from '../components/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorModalComponent } from '../components/error-modal/error-modal.component';
import { HttpAuthInterceptor } from 'src/interceptors/http-auth.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorModalComponent,
    HomeComponent
  ],
  imports: [
    AppRoutingModule, 
    BrowserModule, 
    ReactiveFormsModule, 
    BrowserAnimationsModule, 
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatButtonModule,
    HttpClientModule
  ],
  entryComponents: [
    ErrorModalComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: HttpAuthInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
