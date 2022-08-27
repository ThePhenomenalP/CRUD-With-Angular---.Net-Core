import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  @Input() control: FormControl;
  @Input() inputClass: string = 'form-control';
  // @Input() inputSize: string; //Bootstrap Class
  @Input() label: string;
  @Input() placeHolder: string;
  @Input() type: string = 'text';

  constructor() {}

  ngOnInit(): void {}
}
