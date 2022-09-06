import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EviewDelComponent } from './view-del/view-del.component';
import { AddEditComponent } from './add-edit/add-edit.component';


@NgModule({
  declarations: [
    EviewDelComponent,
    AddEditComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EmployeeModule { }
