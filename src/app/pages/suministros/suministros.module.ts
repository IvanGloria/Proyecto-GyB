import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuministrosPageRoutingModule } from './suministros-routing.module';

import { SuministrosPage } from './suministros.page';
import { Button2Component } from 'src/app/shared/components/button2/button2.component'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuministrosPageRoutingModule
  ],
  declarations: [
    SuministrosPage,
    Button2Component
  ]
})
export class SuministrosPageModule {}
