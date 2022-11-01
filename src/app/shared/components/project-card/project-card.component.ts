import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {

  @Input() title: string = '';
  @Input() date: string = '';

  @Output() deleteEvent = new EventEmitter();
  @Output() selectEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onSelect() {
    this.selectEvent.emit();
  }

  onDelete() {
    this.deleteEvent.emit()
  }

}
