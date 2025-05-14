import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { RolesRoutingModule } from './roles-routing.module';
import { RolesComponent } from './roles.component';
import { CreateRolesComponent } from './create-roles/create-roles.component';
import { EditRolesComponent } from './edit-roles/edit-roles.component';
import { DeleteRolesComponent } from './delete-roles/delete-roles.component';
import { ListRolesComponent } from './list-roles/list-roles.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';


@NgModule({
  declarations: [
    RolesComponent,
    CreateRolesComponent,
    EditRolesComponent,
    DeleteRolesComponent,
    ListRolesComponent
  ],
  imports: [
    CommonModule,
    RolesRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule,


    NgbPaginationModule,
  ]
})
export class RolesModule { }
