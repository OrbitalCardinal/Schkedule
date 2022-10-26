import { Component, Input } from "@angular/core";

@Component({
    selector: 'ung-date-input',
    templateUrl: './ung-date-input.component.html',
    styleUrls: ['./ung-date-input.component.scss']
})

export class UngDateInput {
    @Input() label: string = '';
    @Input() variant: string =  '';
    @Input() leadingIcon: string = '';
    @Input() placeholder: string = '';
    @Input() type: string = 'text';
    @Input() min: string = '';
    @Input() max: string = '';
}