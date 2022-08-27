import { DropdownService } from './../../../_validators/dropdown.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-hero',
  templateUrl: './add-hero.component.html',
  styleUrls: ['./add-hero.component.css'],
})
export class AddHeroComponent implements OnInit {
  constructor(private customValidator: DropdownService) {}
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    category: new FormControl('', [this.customValidator.validate]),
    type: new FormControl('', [this.customValidator.validate]),
    initialMovementSpeed: new FormControl('', Validators.required),
    isPopular: new FormControl<any>(''),
    description: new FormControl('', Validators.required),
  });

  ngOnInit(): void {}

  onSubmit() {
    if (this.form.value.isPopular == '') {
      this.form.value.isPopular = false;
    }
    console.log(this.form.value);
  }
}
