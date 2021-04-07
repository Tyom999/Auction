import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {AdminHeaderComponent} from '../pages/admin/admin-header/admin-header.component';
import {HeaderComponent} from '../pages/header/header.component';



@NgModule({
  declarations: [AdminHeaderComponent, HeaderComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    AdminHeaderComponent,
    HeaderComponent
  ]
})
export class SharedModule { }
