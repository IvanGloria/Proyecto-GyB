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
    path: 'suministros', 
    loadChildren: () => import('./pages/suministros/suministros.module').then(m => m.SuministrosPageModule) 
  },
  { 
    path: 'proyectos', 
    loadChildren: () => import('./pages/proyectos/proyectos.module').then(m => m.ProyectosPageModule) 
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

