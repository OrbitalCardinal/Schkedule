import { Component, Input } from "@angular/core";

@Component({
    selector: 'ung-password-input',
    templateUrl: './ung-password-input.component.html',
    styleUrls: ['./ung-password-input.component.scss']
})

export class UngPasswordInput {
    @Input() label: string = '';
    @Input() variant: string =  '';
    @Input() leadingIcon: string = '';
    @Input() trailingIcon: string = '';
    @Input() placeholder: string = '';

    visible: boolean = true;

    toggleVisible() {
        this.visible = !this.visible;
    }
}