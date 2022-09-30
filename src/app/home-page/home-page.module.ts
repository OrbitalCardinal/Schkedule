import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { HomePageComponent } from "./home-page.component";

@NgModule({
    declarations: [HomePageComponent],
    imports: [CommonModule, SharedModule]
})

export class HomePageModule {}