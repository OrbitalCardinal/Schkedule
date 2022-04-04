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
            'nombre': 'Pantalla de estadisticas de usuario',
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
}
