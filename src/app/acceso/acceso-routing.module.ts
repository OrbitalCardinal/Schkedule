import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccesoComponent } from "./acceso.component";


const routes: Routes = [
    {
      path: 'acceso',
      component: AccesoComponent
    }
  ];

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AccesoRoutingModule {}