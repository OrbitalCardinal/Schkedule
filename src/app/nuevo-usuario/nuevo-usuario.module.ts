import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { NuevoUsuarioRoutingModule } from "./nuevo-usuario-routing.module";
import { NuevoUsuarioComponent } from "./nuevo-usuario.component";

@NgModule({
    declarations: [NuevoUsuarioComponent],
    imports: [CommonModule, NuevoUsuarioRoutingModule, SharedModule, FormsModule, HttpClientModule],
    exports: [NuevoUsuarioComponent]
})

export class NuevoUsuarioModule {}