import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrabajadoresAddPageRoutingModule } from './trabajadores-add-routing.module';

import { TrabajadoresAddPage } from './trabajadores-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrabajadoresAddPageRoutingModule
  ],
  declarations: [TrabajadoresAddPage]
})
export class TrabajadoresAddPageModule {}
