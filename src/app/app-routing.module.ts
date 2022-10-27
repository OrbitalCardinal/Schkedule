import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailRoutingModule } from './detail/detail-routing.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'acceso',
    pathMatch: 'full'
  },
  {
    path: 'nuevo-usuario',
    redirectTo: 'nuevo-usuario',
    pathMatch: 'full'
  },
  {
    path: 'main-page',
    redirectTo: 'main-page'
  },
  {
    path: 'seleccion-usuario',
    redirectTo: 'seleccion-usuario',
    pathMatch: 'full'
  },
  {
    path: 'entrar',
    redirectTo: 'entrar',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    DetailRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
