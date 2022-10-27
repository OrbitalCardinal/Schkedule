import { Component, Input } from "@angular/core";

@Component({
    selector: 'ung-select-input',
    templateUrl: './ung-select-input.component.html',
    styleUrls: ['./ung-select-input.component.scss']
})

export class UngSelectInput {
    @Input() label: string = '';
    @Input() variant: string =  '';
    @Input() leadingIcon: string = '';
    @Input() trailingIcon: string = '';
    @Input() placeholder: string = '';
    @Input() type: string = 'text';
    @Input() options: string[] = [];
}