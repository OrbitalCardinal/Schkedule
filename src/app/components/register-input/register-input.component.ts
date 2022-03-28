import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-register-input',
  templateUrl: './register-input.component.html',
  styleUrls: ['./register-input.component.scss']
})
export class RegisterInputComponent implements OnInit {

  @Input() iconImg: String = '../../../assets/img/user-icon.png';
  @Input() inputType: String = 'Text';
  @Input() inputPlaceholder: String = 'None';

  constructor() { }

  ngOnInit(): void {
  }

}
