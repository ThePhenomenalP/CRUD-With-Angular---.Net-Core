import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { HeroService } from 'src/app/services/hero.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  @Input() btnCancel: boolean = true;
  @Input() btnTitle: string;
  @Input() footer: boolean = true;
  @Input() title: string;
  @Input() heroId: string;
  @Input() modalSize: string = 'modal-lg';
  @Output() close = new EventEmitter();
  @Output() deleteRow = new EventEmitter();
  constructor(private api: HeroService) {}

  ngOnInit(): void {}

  onClose() {
    this.close.emit();
  }

  onBtnClick() {
    this.api.deleteHero(this.heroId).subscribe({
      next: () => {
        this.deleteRow.emit();
        this.close.emit();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
