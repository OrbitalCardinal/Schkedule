import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AccesoRoutingModule } from "./acceso-routing.module";
import { AccesoComponent } from "./acceso.component";

@NgModule({
    declarations: [AccesoComponent],
    imports: [CommonModule, AccesoRoutingModule]
})

export class AccesoModule {}