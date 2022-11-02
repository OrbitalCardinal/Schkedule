import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { BadgeComponent } from "./badge/badge.component";
import { TablePageComponent } from "./table-page.component";
import { TaskModalComponent } from "./task-modal/task-modal.component";

@NgModule({
    declarations: [TablePageComponent, BadgeComponent, TaskModalComponent],
    imports: [CommonModule, SharedModule, FormsModule, HttpClientModule, ReactiveFormsModule]
})

export class TablePageModule {}