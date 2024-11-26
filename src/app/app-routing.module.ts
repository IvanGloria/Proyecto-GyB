import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { guardSGuard } from './shared/guard/guard.guard';


const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate : [guardSGuard]

  },
  { 
    path: 'trabajadores', 
    loadChildren: () => import('./pages/trabajadores/trabajadores.module').then(m => m.TrabajadoresPageModule), 
    canActivate : [guardSGuard]

  },
  {
    path: 'trabajadores-add',
    loadChildren: () => import('./pages/trabajadores-add/trabajadores-add.module').then( m => m.TrabajadoresAddPageModule),
    canActivate : [guardSGuard]
  },
  { 
    path: 'suministros', 
    loadChildren: () => import('./pages/suministros/suministros.module').then(m => m.SuministrosPageModule),
    canActivate : [guardSGuard]
  },
  { 
    path: 'proyectos', 
    loadChildren: () => import('./pages/proyectos/proyectos.module').then(m => m.ProyectosPageModule),
    canActivate : [guardSGuard] 
  },
  {
    path: 'proyectos-add',
    loadChildren: () => import('./pages/proyectos-add/proyectos-add.module').then( m => m.ProyectosAddPageModule),
    canActivate : [guardSGuard]
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

