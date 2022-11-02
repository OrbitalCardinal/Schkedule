import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'modal-wrapper',
  templateUrl: './modal-wrapper.component.html',
  styleUrls: ['./modal-wrapper.component.scss']
})
export class ModalWrapperComponent implements OnInit {
  @Input() modalTitle = '';
  @Output() closeModal = new EventEmitter();
  @Input() contentDirection = '';
  @Input() modalSubtitle = '';

  constructor() { }

  onCloseModal() {
    this.closeModal.emit();
  }

  ngOnInit(): void {
  }

}
