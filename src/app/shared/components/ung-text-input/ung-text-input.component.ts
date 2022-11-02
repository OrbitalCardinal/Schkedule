import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    'selector': 'ung-text-input',
    'templateUrl': './ung-text-input.component.html',
    'styleUrls': ['./ung-text-input.component.scss'],
})

export class UngTextInput {
    @Input() label: string = '';
    @Input() variant: string =  '';
    @Input() leadingIcon: string = '';
    @Input() trailingIcon: string = '';
    @Input() placeholder: string = '';
    @Input() type: string = 'text';
    @Input() name: string = '';
}
