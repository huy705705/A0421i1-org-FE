import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AuthGuard} from "../sercurity/auth.guard";
import {CageListComponent} from "./cage-list/cage-list.component";


const routes: Routes = [
  {path:'employee/cage',component: CageListComponent, canActivate: [AuthGuard], data:{expectedRole: ['ROLE_EMPLOYEE', 'ROLE_ADMIN']}},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CageRoutingModule { }
