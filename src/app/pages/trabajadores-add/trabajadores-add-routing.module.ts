import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrabajadoresAddPage } from './trabajadores-add.page';

const routes: Routes = [
  {
    path: '',
    component: TrabajadoresAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrabajadoresAddPageRoutingModule {}
