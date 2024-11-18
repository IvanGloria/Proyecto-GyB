import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuministrosPageRoutingModule } from './suministros-routing.module';

import { SuministrosPage } from './suministros.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuministrosPageRoutingModule
  ],
  declarations: [SuministrosPage]
})
export class SuministrosPageModule {}
