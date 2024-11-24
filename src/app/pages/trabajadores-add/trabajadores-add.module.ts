import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrabajadoresAddPageRoutingModule } from './trabajadores-add-routing.module';

import { TrabajadoresAddPage } from './trabajadores-add.page';
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrabajadoresAddPageRoutingModule,
    SharedModule
],
  declarations: [TrabajadoresAddPage]
})
export class TrabajadoresAddPageModule {}
