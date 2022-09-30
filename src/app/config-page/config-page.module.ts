import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { ConfigPageComponent } from "./config-page.component";

@NgModule({
    declarations: [ConfigPageComponent],
    imports: [CommonModule, SharedModule]
})

export class ConfigPageModule {}