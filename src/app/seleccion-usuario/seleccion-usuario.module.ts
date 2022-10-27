import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { SeleccionUsuarioRoutingModule } from "./seleccion-usuario-routing.module";
import { SeleccionUsuarioComponent } from "./seleccion-usuario.component";

@NgModule({
    declarations: [SeleccionUsuarioComponent],
    imports: [CommonModule, SeleccionUsuarioRoutingModule, SharedModule, HttpClientModule]
})

export class SeleccionUsuarioModule {}