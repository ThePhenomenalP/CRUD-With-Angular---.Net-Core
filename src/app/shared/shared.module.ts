import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { SelectDropdownComponent } from './select-dropdown/select-dropdown.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    InputComponent,
    CheckboxComponent,
    SelectDropdownComponent,
    ModalComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [
    InputComponent,
    CheckboxComponent,
    SelectDropdownComponent,
    ModalComponent,
  ],
})
export class SharedModule {}
