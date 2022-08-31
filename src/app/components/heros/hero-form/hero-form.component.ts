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
  @Output() refreshData = new EventEmitter();
  @Output() close = new EventEmitter();
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
    });
  }

  onSubmit() {
    this.Api.updateHero(this.form.value).subscribe({
      next: (response) => {
        this.refreshData.emit(response);
        this.close.emit();
      },
    });
  }
}
