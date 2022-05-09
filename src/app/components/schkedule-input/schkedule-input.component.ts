import { Component, Input } from "@angular/core";

@Component({
    selector: 'schkedule-input',
    templateUrl: './schkedule-input.component.html',
    styleUrls: ['./schkedule-input.component.scss']
})

export class SchkeduleInput {
    active = false;
    @Input() placeHolder: String = '';
    @Input() icon: String = '';
    @Input() isPassword: Boolean = false;
    passwordVisible: Boolean = false;

    togglePassword() {
        this.passwordVisible = !this.passwordVisible;
    }
}