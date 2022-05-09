import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'new-project-page',
    templateUrl: './new-project-page.component.html',
    styleUrls: ['./new-project-page.component.scss']
})

export class NewProjectPageComponent implements OnInit {

    projectId: string = '';
    tituloProyecto = '';
    projectData: any;
    isLoading = true;
    testList: any[] = [];

    editCellListNombre: any[] = [];

    editCellListEstatus: any [] = [];

    editCellListCategoria: any[] = [];

    constructor(private activatedRoute: ActivatedRoute, private http: HttpClient ) {} 


    ngOnInit() {
        this.activatedRoute.queryParams
        .subscribe(params => {
            if(Object.keys(params).length > 0) {
                console.log(params);
                this.projectId = params['project_id']; 
                this.http.get(`https://schkedule-default-rtdb.firebaseio.com/proyecto.json?orderBy="$key"&equalTo="${this.projectId}"`).subscribe(result => {
                this.projectData = result;
                this.projectData = Object.values(this.projectData)[0];
                this.tituloProyecto = this.projectData['nombre_proyecto'];
                console.log(this.projectData)
                this.isLoading = false;
                console.log('PROJECT ID: ' + this.projectId);

                this.http.get(`https://schkedule-default-rtdb.firebaseio.com/actividad-proyecto.json?orderBy="id_proyecto"&equalTo="${this.projectId}"`).subscribe(activityResult => {
                    this.testList = Object.values(activityResult);
                    for(let i = 0; i < this.testList.length; i++) {
                        this.editCellListNombre.push(true);
                        this.editCellListEstatus.push(true);
                        this.editCellListCategoria.push(true);
                    }
                })
                });
            }
        })

    }

    showModal = false;

    // TITULO DE PROYECTO

    editTituloProyecto = true;

    addNewTask() {
        let lastNo = '';
        if(this.testList.length > 0) {
            let lastNoIndex = this.testList.length - 1;
            lastNo = this.testList[lastNoIndex].no;
        } else {
            lastNo = '0';
        }
        
        let data =  {
                'no': (parseInt(lastNo) + 1).toString(),
                'nombre': 'Nueva actividad',
                'estatus': '',
                'categoria': '',
                'fecha': '',
                'id_proyecto': this.projectId
            };

        this.testList.push(data);

        this.editCellListNombre.push(true);
        this.editCellListEstatus.push(true);
        this.editCellListCategoria.push(true);

        this.http.post(`https://schkedule-default-rtdb.firebaseio.com/actividad-proyecto.json`, data).subscribe(result => {
            console.log(data);
        })
    }

    deleteTask(no: String) {
        this.testList = this.testList.filter(element => element.no != no);
        for(let i = 0; i < this.testList.length; i++) {
            let newNo = i + 1;
            this.testList[i].no = newNo.toString();
        }
    }

    toggleModal() {
        this.showModal = !this.showModal;
    }

    editCell(no: string, column: string) {
        let listReference = [];
        if(column == 'nombre') {
            listReference = this.editCellListNombre;
        }
        else if (column == 'estatus') {
            listReference = this.editCellListEstatus;
        }
        else if (column == 'categoria') {
            listReference = this.editCellListCategoria;
        }
        let editIndex = parseInt(no) - 1;

        for(let i = 0; i < listReference.length; i++) {
            this.editCellListNombre[i] = true;
            this.editCellListEstatus[i] = true;
            this.editCellListCategoria[i] = true;
        }

        for(let i = 0; i < listReference.length; i++) {
            if(i == editIndex) {
                listReference[parseInt(no) - 1] = false;
            } else {
                listReference[i] = true;
            }
        }
    }

    saveCell(index: number) {
        console.log(this.testList[index]);
        console.log(this.projectData);
        console.log(this.projectId);
        this.http.get(`https://schkedule-default-rtdb.firebaseio.com/actividad-proyecto.json?orderBy="id_proyecto"&equalTo="${this.projectId}"`).subscribe(result => {
            if(Object.keys(result).length > 0) {
                let objectIndex = Object.values(result).findIndex(elements => elements['id_proyecto'] == this.projectId && elements['no'] == index + 1);
                console.log(objectIndex);
                let objectId = Object.keys(result)[objectIndex];
                this.http.patch(`https://schkedule-default-rtdb.firebaseio.com/actividad-proyecto/${objectId}.json`, this.testList[index]).subscribe(resultPatch => {
                    console.log(resultPatch);
                })
            }
            
        })
        for(let i = 0; i < this.editCellListNombre.length; i ++) {
            this.editCellListNombre[i] = true;
            this.editCellListEstatus[i] = true;
            this.editCellListCategoria[i] = true;
        }
    }

    changeProjectName() {
        this.editTituloProyecto = true;
        this.projectData['nombre_proyecto'] = this.tituloProyecto;
        this.http.patch(`https://schkedule-default-rtdb.firebaseio.com/proyecto/${this.projectId}.json`, this.projectData).subscribe(result => {
            console.log(result);
        })
    }

}
