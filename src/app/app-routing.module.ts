import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  { 
    path: 'trabajadores', 
    loadChildren: () => import('./pages/trabajadores/trabajadores.module').then(m => m.TrabajadoresPageModule) 
  },
  {
    path: 'trabajadores-add',
    loadChildren: () => import('./pages/trabajadores-add/trabajadores-add.module').then( m => m.TrabajadoresAddPageModule)
  },
  { 
    path: 'suministros', 
    loadChildren: () => import('./pages/suministros/suministros.module').then(m => m.SuministrosPageModule) 
  },
  { 
    path: 'contabilidad', 
    loadChildren: () => import('./pages/contabilidad/contabilidad.module').then(m => m.ContabilidadPageModule) 
  },
  { 
    path: 'proyectos', 
    loadChildren: () => import('./pages/proyectos/proyectos.module').then(m => m.ProyectosPageModule) 
  },
  {
    path: 'proyectos-add',
    loadChildren: () => import('./pages/proyectos-add/proyectos-add.module').then( m => m.ProyectosAddPageModule)
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

