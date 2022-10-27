import { Component, Input } from "@angular/core";

@Component({
    'selector': 'ung-button',
    'templateUrl': './ung-button.component.html',
    'styleUrls': ['./ung-button.component.scss']
})

export class UngButtonComponent {
    @Input() variant: string = '';
    @Input() trailingIcon: string = '';
    @Input() leadingIcon: string = '';
    @Input() type: string = '';
    @Input() disabled: boolean = false;
}