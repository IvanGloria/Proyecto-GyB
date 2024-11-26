import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProyectosAddPage } from './proyectos-add.page';


const routes: Routes = [
  {
    path: '',
    component: ProyectosAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProyectosAddPageRoutingModule {}
