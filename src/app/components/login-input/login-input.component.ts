import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-login-input',
  templateUrl: './login-input.component.html',
  styleUrls: ['./login-input.component.scss']
})
export class LoginInputComponent implements OnInit {


  @Input() iconImg: String = '../../../assets/img/user-icon.png';
  @Input() inputType: String = 'Text';
  @Input() inputPlaceholder: String = 'None';

  constructor() { }


  ngOnInit() {
  }

}
