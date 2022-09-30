import { Component, Input } from "@angular/core";

@Component({
    selector: 'ungistor-input',
    templateUrl: './ungistor-input.component.html',
    styleUrls: ['./ungistor-input.component.scss']
})

export class UngistorInputComponent {
    active = false;
    @Input() placeHolder: String = '';
    @Input() icon: String = '';
    @Input() isPassword: Boolean = false;
    passwordVisible: Boolean = false;

    togglePassword() {
        this.passwordVisible = !this.passwordVisible;
    }
}