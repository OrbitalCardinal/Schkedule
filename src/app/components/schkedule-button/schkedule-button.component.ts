import { Component, Input } from "@angular/core";

@Component({
    selector: 'schkedule-button',
    templateUrl: './schkedule-button.component.html',
    styleUrls: ['./schkedule-button.component.scss']
})


export class SchkeduleButtonComponent {
    @Input() color: String = '#0B7EAF';
    @Input() leadingIcon: String = '';
}
