import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SeleccionUsuarioComponent } from "./seleccion-usuario.component";

const routes: Routes = [
      {
        path: 'seleccion-usuario',
        component: SeleccionUsuarioComponent
      }
];

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class SeleccionUsuarioRoutingModule {}