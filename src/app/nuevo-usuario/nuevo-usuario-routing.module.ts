import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NuevoUsuarioComponent } from "./nuevo-usuario.component";
import { NuevoUsuarioModule } from "./nuevo-usuario.module";

const routes: Routes = [
    {
        path: 'nuevo-usuario',
        component: NuevoUsuarioComponent
    }
]

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class NuevoUsuarioRoutingModule {}