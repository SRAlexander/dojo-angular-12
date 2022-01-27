import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [    
    CommonModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule
  ],
})
export class SharedModule { }
