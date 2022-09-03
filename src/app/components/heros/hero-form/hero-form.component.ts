import { HeroService } from './../../../services/hero.service';
import { hero } from './../../../models/heros.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DropdownService } from './../../../_validators/dropdown.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css'],
})
export class HeroFormComponent implements OnInit {
  @Input() heroDetails?: hero;
  @Input() btnTitle: string;
  @Output() refreshData = new EventEmitter();
  @Output() close = new EventEmitter();
  newImage: string;
  form: FormGroup;
  constructor(
    private customValidator: DropdownService,
    private Api: HeroService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl(this.heroDetails.id),
      name: new FormControl(this.heroDetails.name, Validators.required),
      category: new FormControl(this.heroDetails.category, [
        this.customValidator.validate,
      ]),
      type: new FormControl(this.heroDetails.type, [
        this.customValidator.validate,
      ]),
      initialMovementSpeed: new FormControl(
        this.heroDetails.initialMovementSpeed,
        Validators.required
      ),
      isPopular: new FormControl<any>(this.heroDetails.isPopular),
      description: new FormControl(
        this.heroDetails.description,
        Validators.required
      ),
      imageName: new FormControl(null),
    });
  }

  uploadFile(data) {
    const file = (data.target as HTMLInputElement).files[0];
    this.form.patchValue({
      imageName: file,
    });
    this.form.get('imageName').updateValueAndValidity();

    let fd: any = new FormData();
    fd.append('Image', file);
    this.Api.uploadImage(fd).subscribe({
      next: () => {
        this.heroDetails.imageName = file.name;
      },
    });
  }

  onSubmit() {
    var formData: any = new FormData();
    formData.append('name', this.form.get('name').value);
    formData.append('category', this.form.get('category').value);
    formData.append('type', this.form.get('type').value);
    formData.append(
      'initialMovementSpeed',
      this.form.get('initialMovementSpeed').value
    );
    formData.append('isPopular', this.form.get('isPopular').value);
    formData.append('description', this.form.get('description').value);
    formData.append('imageName', this.form.get('imageName').value);

    this.Api.updateHero(this.form.value.id, formData).subscribe({
      next: (response) => {
        console.log(response);
        this.refreshData.emit();
        this.close.emit();
      },
    });
  }
}
