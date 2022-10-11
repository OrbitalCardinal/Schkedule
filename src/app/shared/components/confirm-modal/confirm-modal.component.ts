import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'confirm-modal',
    templateUrl: './confirm-modal.component.html',
    styleUrls: ['./confirm-modal.component.scss']
})

export class ConfirmModalComponent {
    @Output() closeModalEvent = new EventEmitter<boolean>();

    closeModal(isConfirm) {
        this.closeModalEvent.emit(isConfirm);
    }
}