import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EntrarComponent } from "./entrar.component";

const routes: Routes = [
    {
        path: 'entrar',
        component: EntrarComponent
    }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class EntrarRoutingModule {}