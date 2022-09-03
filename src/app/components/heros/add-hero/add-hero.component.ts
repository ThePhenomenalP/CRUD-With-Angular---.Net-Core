import { CookieService } from 'ngx-cookie-service';
import { HeroService } from './../../../services/hero.service';
import { DropdownService } from './../../../_validators/dropdown.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-hero',
  templateUrl: './add-hero.component.html',
  styleUrls: ['./add-hero.component.css'],
})
export class AddHeroComponent implements OnInit {
  constructor(
    private customValidator: DropdownService,
    private api: HeroService,
    private route: Router,
    private cookie: CookieService
  ) {}
  signedIn: string;
  imageName: string = 'y9DpT.jpg';

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    category: new FormControl('', [this.customValidator.validate]),
    type: new FormControl('', [this.customValidator.validate]),
    initialMovementSpeed: new FormControl('', Validators.required),
    isPopular: new FormControl<any>(false),
    description: new FormControl('', Validators.required),
    imageName: new FormControl(null, Validators.required),
  });

  ngOnInit(): void {
    this.signedIn = this.cookie.get('signedIn');
    console.log(this.signedIn);
  }

  uploadFile(data) {
    const file = (data.target as HTMLInputElement).files[0];
    this.form.patchValue({
      imageName: file,
    });
    this.form.get('imageName').updateValueAndValidity();

    let fd: any = new FormData();
    fd.append('Image', file);
    this.api.uploadImage(fd).subscribe({
      next: () => {
        this.imageName = file.name;
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

    this.api.AddNewHero(formData).subscribe({
      next: () => {
        this.route.navigate(['/heros']);
      },
    });
  }
}
