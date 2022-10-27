import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { AccesoRoutingModule } from "./acceso-routing.module";
import { AccesoComponent } from "./acceso.component";

@NgModule({
    declarations: [AccesoComponent],
    imports: [CommonModule, AccesoRoutingModule, SharedModule]
})

export class AccesoModule {}