import { Component, Input } from "@angular/core";

@Component({
    selector: 'ung-user-avatar',
    templateUrl: './ung-user-avatar.component.html',
    styleUrls: ['./ung-user-avatar.component.scss']
})

export class UngUserAvatar {
    @Input() name: string = '';
}