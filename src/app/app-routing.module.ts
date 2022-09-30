import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailRoutingModule } from './detail/detail-routing.module';
import { MainPageRoutingModule } from './main-page/main-page-routing.module';
import { NuevoUsuarioComponent } from './nuevo-usuario/nuevo-usuario.component';

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
