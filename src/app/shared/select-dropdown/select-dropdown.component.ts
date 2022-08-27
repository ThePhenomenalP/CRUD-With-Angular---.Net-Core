import { FormControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-select-dropdown',
  templateUrl: './select-dropdown.component.html',
  styleUrls: ['./select-dropdown.component.css'],
})
export class SelectDropdownComponent implements OnInit {
  @Input() control: FormControl;
  @Input() dropdownItems: string[];
  @Input() label: string;
  // @Input() dropdownSize: string = 'col-md-4';
  constructor() {}

  ngOnInit(): void {}
}
