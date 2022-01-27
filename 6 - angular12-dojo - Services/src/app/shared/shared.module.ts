import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ErrorNotificationComponent } from './components/error-notification/error-notification.component'

@NgModule({
  declarations: [
    ErrorNotificationComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [    
    CommonModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AlertModule,
    ErrorNotificationComponent
  ],
})
export class SharedModule { }
