import { Component } from "@angular/core";
import { ActividadHorarioModel } from '../../models/actividad-horario-model';
import { ListActividadHorarioModel } from '../../models/list-actividad-horario-model'
import { HorarioModel } from '../../models/horario-model'
import { SwitchHorarioModalService } from 'src/app/services/switch-horario-modal.service';
@Component({
  selector: 'schedule-page',
  templateUrl: './schedule-page.component.html',
  styleUrls: ['./schedule-page.component.scss', '../global-pages-styles/ball-atom.scss']
})

export class SchedulePageComponent {

  public isLoading = true;
  public modalSwitch: boolean = false;
  public Horario: HorarioModel = {
    id_Horario: "",
    nombre_horario: "",
    // Edit Controls
    editNombre: true,
  }
  public ActividadHorario: ActividadHorarioModel[] = []
  public ActividadHorarioModal: ActividadHorarioModel[] = []
  public ListActividad: ListActividadHorarioModel[] = []

  constructor(private modalSwitchS: SwitchHorarioModalService) { }

  ngOnInit() {

    setTimeout(() => {
      this.getHorario();
      this.isLoading = false;
    }, 900);

    this.modalSwitchS.$switchModal.subscribe((valor) => { this.modalSwitch = valor });

    this.modalSwitchS.$ActividadHorarioModel.subscribe(
      (item) => {
        if (item.delete) {
          this.deleteActividadHorario(
            item.id_horario,
            item.id_actividad_horario
          )
        } else if (item.edit) {
          this.patchActividadHorario(item);
        } else {
          this.postActividadHorario(item);
        }
      }
    );

  }

  private makeGrid() {

    let id_hora_frecuencia: number = 0;

    let printHour: number = 7;
    const totalHours: number = 12;
    const totalDays: number = 7;
    const searchByID = (element: ActividadHorarioModel) => element.id_hora_frecuencia == id_hora_frecuencia

    this.ListActividad = []

    for (let indexHours = 0; indexHours < totalHours; indexHours++) {

      const listDays: ActividadHorarioModel[] = []

      for (let indexDays = 0; indexDays < totalDays; indexDays++) {

        const index = this.ActividadHorario.findIndex(searchByID)
        let id_actividad_horario = "";
        let descripcion = "";
        let bgColorClass = "";

        if (index >= 0 ){
          id_actividad_horario = this.ActividadHorario[index].id_actividad_horario
          descripcion = this.ActividadHorario[index].descripcion
          bgColorClass = "bGblue"
        }

        const actividad: ActividadHorarioModel = {
          id_actividad_horario: id_actividad_horario,
          id_horario: this.Horario.id_Horario,
          descripcion: descripcion,
          id_hora_frecuencia: id_hora_frecuencia,
          // Edit Controls
          bgColorClass: bgColorClass,
          edit: false,
          delete: false
        }

        listDays.push(actividad)
        id_hora_frecuencia++;
      }

      const stringHour = this.formatHour(printHour);

      const listaHoras: ListActividadHorarioModel = {
        hora: stringHour,
        listDays: listDays,
      }

      this.ListActividad.push(listaHoras)
      printHour++;
    }
  }

  public formatHour(hour: number){
    if (hour < 10){
      return `0${hour}:00`
    }else {
      return `${hour}:00`
    }
  }

  public openModal(actividad: ActividadHorarioModel) {
    this.ActividadHorarioModal = []
    this.ActividadHorarioModal.push(actividad)

    if (this.ActividadHorarioModal[0].id_actividad_horario != "" ){
      this.ActividadHorarioModal[0].edit = true
    }

    this.modalSwitch = true;
  }

  private getmyHeaders() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", "*");
    myHeaders.append("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS");
    myHeaders.append("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    return myHeaders;
  }

  private fillInHorario(result: string) {

    const data = JSON.parse(result);

    for (let id_Horario in data) {
      const horarioModel: HorarioModel = {
        id_Horario: id_Horario,
        nombre_horario: data[id_Horario]['nombre_horario'],
        // Edit Controls
        editNombre: true
      }
      this.Horario ={
        id_Horario: horarioModel.id_Horario,
        nombre_horario: horarioModel.nombre_horario,
        // Edit Controls
        editNombre: horarioModel.editNombre,
      } ;
    }
  }

  private fillInActividadHorario(result: string, id_Horario: string) {

    const data = JSON.parse(result);
    this.ActividadHorario = []

    for (let id_Horario in data) {
      const ActividadHorarioModel: ActividadHorarioModel = {
        id_actividad_horario: id_Horario,
        id_horario: id_Horario,
        descripcion: data[id_Horario]['descripcion'],
        id_hora_frecuencia: data[id_Horario]['id_hora_frecuencia'],
        // Edit Controls
        bgColorClass: "bGblue",
        edit: false,
        delete: false
      }
      this.ActividadHorario.push(ActividadHorarioModel);
    }
  }

  private getHorario() {

    const url_api = "https://schkedule-default-rtdb.firebaseio.com/Horario/";
    const myHeaders = this.getmyHeaders();

    let params: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    const localStorageUser = JSON.parse(localStorage['user']);
    const lid_usuario = localStorageUser.id_usuario;

    fetch(`${url_api}${lid_usuario}.json`, params)
      .then(response => response.text())
      .then((result) => {
        if (result == 'null') { // Si no hay datos, creamos el registro del usuario
          this.postHorario('Nuevo Horario')
        } else {
          this.fillInHorario(result);
          this.getActividadHorario(this.Horario.id_Horario)
        }
      })
      .catch(error => console.log('error', error));

  }

  private postHorario(nombre_horario: string) {

    const url_api = "https://schkedule-default-rtdb.firebaseio.com/Horario/";
    const myHeaders = this.getmyHeaders();

    const data = {
      nombre_horario
    }

    let params: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: 'follow'
    };

    const localStorageUser = JSON.parse(localStorage['user']);
    const lid_usuario = localStorageUser.id_usuario;

    fetch(`${url_api}${lid_usuario}.json`, params)
      .then(response => response.text())
      .then((result) => {
        this.getHorario()
      })
      .catch(error => console.log('error', error));
  }

  private patchHorario(nombre_horario: string, id_horario: string) {

    const url_api = "https://schkedule-default-rtdb.firebaseio.com/Horario/";
    const myHeaders = this.getmyHeaders();

    const data = {
      nombre_horario
    }

    let params: RequestInit = {
      method: 'PATCH',
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: 'follow'
    };

    const localStorageUser = JSON.parse(localStorage['user']);
    const lid_usuario = localStorageUser.id_usuario;

    fetch(`${url_api}${lid_usuario}/${id_horario}.json`, params)
      .then(response => response.text())
      .then((result) => {

      })
      .catch(error => console.log('error', error));
  }

  private getActividadHorario(id_Horario: string) {

    const url_api = "https://schkedule-default-rtdb.firebaseio.com/Actividad-Horario/";
    const myHeaders = this.getmyHeaders();

    let params: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${url_api}${id_Horario}.json`, params)
      .then(response => response.text())
      .then((result) => {
        this.fillInActividadHorario(result, id_Horario);
        this.makeGrid();
      })
      .catch(error => console.log('error', error));

  }

  private patchActividadHorario(actividad: ActividadHorarioModel) {
    const url_api = "https://schkedule-default-rtdb.firebaseio.com/Actividad-Horario/";
    const myHeaders = this.getmyHeaders();

    const data = {
      descripcion: actividad.descripcion
    }

    let params: RequestInit = {
      method: 'PATCH',
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: 'follow'
    };

    fetch(`${url_api}${actividad.id_horario}/${actividad.id_actividad_horario}.json`, params)
      .then(response => response.text())
      .then((result) => {
        this.getActividadHorario(this.Horario.id_Horario)
      })
      .catch(error => console.log('error', error));

  }

  private deleteActividadHorario(id_Horario: string, id_actividad_kanban: string) {
    const url_api = "https://schkedule-default-rtdb.firebaseio.com/Actividad-Horario/";
    const myHeaders = this.getmyHeaders();

    let params: RequestInit = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${url_api}${id_Horario}/${id_actividad_kanban}.json`, params)
      .then(response => response.text())
      .then((result) => {
        this.getActividadHorario(this.Horario.id_Horario)
      })
      .catch(error => console.log('error', error));

  }

  private postActividadHorario(actividad: ActividadHorarioModel) {
    const url_api = "https://schkedule-default-rtdb.firebaseio.com/Actividad-Horario/";
    const myHeaders = this.getmyHeaders();

    const data = {
      id_actividad_horario: actividad.id_actividad_horario,
      id_horario: actividad.id_horario,
      descripcion: actividad.descripcion,
      id_hora_frecuencia: actividad.id_hora_frecuencia,
    }

    let params: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: 'follow'
    };

    fetch(`${url_api}${actividad.id_horario}.json`, params)
      .then(response => response.text())
      .then((result) => {
        this.getActividadHorario(this.Horario.id_Horario)
      })
      .catch(error => console.log('error', error));

  }

  public editDescription() {
    this.Horario.editNombre = true
    this.patchHorario(
      this.Horario.nombre_horario,
      this.Horario.id_Horario
    )
  }

}
