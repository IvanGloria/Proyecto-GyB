import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuministrosPage } from './suministros.page';

const routes: Routes = [
  {
    path: '',
    component: SuministrosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuministrosPageRoutingModule {}
