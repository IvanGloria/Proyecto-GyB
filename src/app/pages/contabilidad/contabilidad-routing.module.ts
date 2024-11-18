import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContabilidadPage } from './contabilidad.page';

const routes: Routes = [
  {
    path: '',
    component: ContabilidadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContabilidadPageRoutingModule {}
