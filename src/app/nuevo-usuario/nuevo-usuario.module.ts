import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NuevoUsuarioRoutingModule } from "./nuevo-usuario-routing.module";
import { NuevoUsuarioComponent } from "./nuevo-usuario.component";

@NgModule({
    declarations: [NuevoUsuarioComponent],
    imports: [CommonModule, NuevoUsuarioRoutingModule],
    exports: [NuevoUsuarioComponent]
})

export class NuevoUsuarioModule {}