import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EviewDelComponent } from './view-del/view-del.component';

const routes: Routes = [
  {path:'', redirectTo:'employee', pathMatch:'full'},
  {path:'employee', component:EviewDelComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
