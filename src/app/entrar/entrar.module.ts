import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { EntrarRoutingModule } from "./entrar-routing.module";
import { EntrarComponent } from "./entrar.component";

@NgModule({
    declarations: [EntrarComponent],
    imports: [CommonModule, EntrarRoutingModule, SharedModule],
    exports: [EntrarComponent]
})

export class EntrarModule {}