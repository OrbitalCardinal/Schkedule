import { Component } from "@angular/core";

@Component({
    selector: 'new-project-page',
    templateUrl: './new-project-page.component.html',
    styleUrls: ['./new-project-page.component.scss']
})

export class NewProjectPageComponent {
    testList = [
        {
            'no': '1',
            'nombre': 'Pantalla de estadisticas de USUARIO',
            'estatus': 'En progeso',
            'categoria': 'UI',
            'fecha': '10/10/10'
        },
        {
            'no': '2',
            'nombre': 'Configuración de rutas',
            'estatus': 'En progeso',
            'categoria': 'UI',
            'fecha': '10/10/10'
        }
    ];

    editCellListNombre = [
        true,
        true
    ];

    editCellListEstatus = [
        true,
        true
    ];

    editCellListCategoria = [
        true,
        true
    ];

    showModal = false;

    // TITULO DE PROYECTO
    tituloProyecto = 'Nuevo proyecto';
    editTituloProyecto = true;

    addNewTask() {
        let lastNo = '';
        if(this.testList.length > 0) {
            let lastNoIndex = this.testList.length - 1;
            lastNo = this.testList[lastNoIndex].no;
        } else {
            lastNo = '0';
        }
        
        
        this.testList.push(
            {
                'no': (parseInt(lastNo) + 1).toString(),
                'nombre': 'Nueva actividad',
                'estatus': '',
                'categoria': '',
                'fecha': ''
            },
        )

        this.editCellListNombre.push(true);
        this.editCellListEstatus.push(true);
        this.editCellListCategoria.push(true);
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

    saveCell() {
        console.log(this.testList);
        for(let i = 0; i < this.editCellListNombre.length; i ++) {
            this.editCellListNombre[i] = true;
            this.editCellListEstatus[i] = true;
            this.editCellListCategoria[i] = true;
        }
    }
}
