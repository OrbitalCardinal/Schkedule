import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { SharedModule } from "../shared/shared.module";
import { HomePageComponent } from "./home-page.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

@NgModule({
    declarations: [HomePageComponent],
    imports: [CommonModule, SharedModule, NgxChartsModule, BrowserAnimationsModule ]
})

export class HomePageModule {}