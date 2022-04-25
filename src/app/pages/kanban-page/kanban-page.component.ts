import { Component } from "@angular/core";
import { KanbanModel } from "../../models/kanban-model";
import { KanbanSectionModel } from "../../models/kanban-section-model";
import { KanbanTaskModel } from "../../models/kanban-task-model";

@Component({
  selector: 'kanban-page',
  templateUrl: './kanban-page.component.html',
  styleUrls: ['./kanban-page.component.scss']
})

export class KanbanPageComponent {

  public kanbanBoard: KanbanModel;

  constructor() {

    // let KanbanSectionModel: KanbanSectionModel;
    // let KanbanTaskModel: KanbanTaskModel;

    let Sections = [];
    const randSection = this.randomIntFromInterval(1, 10) //TEST numero random de Sections

    for (let i = 0; i < randSection; i++) {

      let Task = [];
      const randTask = this.randomIntFromInterval(1, 20) //TEST numero random de Task

      for (let j = 0; j < randTask; j++) {

        const KanbanTaskModel: KanbanTaskModel = {
          kanbanTaskDescription: "S: " + i + " - T: " + j,
          Tags: ["Mobile", "Web"],
          priority: "Baja",
          date: "Mar 3, 2022"
        }

        Task.push(KanbanTaskModel);

      }

      const KanbanSectionModel: KanbanSectionModel = {
        kanbanSectionName: "Section: " + i,
        tasks: Task,
      }

      Sections.push(KanbanSectionModel);

    }

    this.kanbanBoard = {
      kanbanName: "ejemplo",
      sections: Sections,
    }

    console.log(this.kanbanBoard)

  }

  private randomIntFromInterval(min: number, max: number) { //TEST RANDOM NUMBER
    return Math.floor(Math.random() * max) + min
  }

}
