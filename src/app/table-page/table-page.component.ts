import { Component, OnInit } from "@angular/core";
import { isModifier } from "typescript/lib/tsserverlibrary";

@Component({
  selector: "table-page",
  templateUrl: "./table-page.component.html",
  styleUrls: ["./table-page.component.scss"],
})
export class TablePageComponent implements OnInit {
  isLoading = true;

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  // Global variables
  modalActive = false;
  confirmModalActive = false;
  actualDeleteIndex = null;
  actualTaskData = {};
  actualTaskIndex = null;
  isNewTask = false;
  title = "SA-Angular-Dev";
  data = [
    {
      "tarea": "Creación de base de datos",
      "estado": "Pendiente",
      "categoria": "Web Development",
      "fechaInicial": "2021-10-12",
      "fechaFinal": "2021-12-12"
    },
    {
      "tarea": "Implementación pantalla",
      "estado": "En progreso",
      "categoria": "Business Intelligence",
      "fechaInicial": "2021-10-12",
      "fechaFinal": "2021-12-12"
    },
    {
      "tarea": "Implementación pantalla",
      "estado": "Hecho",
      "categoria": "Web Development",
      "fechaInicial": "2021-10-12",
      "fechaFinal": "2021-12-12"
    },
    {
      "tarea": "Creación Dashboard",
      "estado": "Pendiente",
      "categoria": "Web Development",
      "fechaInicial": "2021-10-12",
      "fechaFinal": "2021-12-12"
    },
    {
      "tarea": "Implementación pantalla",
      "estado": "En progreso",
      "categoria": "User Interface",
      "fechaInicial": "2021-10-12",
      "fechaFinal": "2021-12-12"
    },
    {
      "tarea": "Creación Dashboard",
      "estado": "En progreso",
      "categoria": "Business Intelligence",
      "fechaInicial": "2021-10-12",
      "fechaFinal": "2021-12-12"
    }
  ];

  openModal(selectedTaskData, selectedTaskIndex) {
    this.actualTaskData = selectedTaskData;
    this.modalActive = true;
    this.actualTaskIndex = selectedTaskIndex;
  }

  openConfirmModal(deleteIndex) {
    this.actualDeleteIndex = deleteIndex;
    this.confirmModalActive = true;
  }

  closeConfirmModal(isConfirm, deleteIndex) {
    if(isConfirm) {
      console.log('Se elimina: ' + deleteIndex);
      
      // remove item at index
      let newData = []
      for(let i = 0; i < this.data.length; i++) {
        if(i != deleteIndex) {
          newData.push(this.data[i]);
        }
      }
      this.data = newData;
      
      this.confirmModalActive = false;
      return;
    }
    this.confirmModalActive = false;
  }

  addTask(taskData) {
    let isModify = taskData[1];
    if(isModify) {
      this.data[taskData[2]] = taskData[0];
      this.modalActive = false;
      return;
    }
    this.data.push(taskData[0]);
    this.modalActive = false;
  }
}
