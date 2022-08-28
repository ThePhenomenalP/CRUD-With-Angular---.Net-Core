import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';

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
  @Output() close = new EventEmitter();
  constructor(private er: ElementRef) {}

  ngOnInit(): void {
    // document.body.appendChild(this.er.nativeElement);
  }

  ngOnDestroy(): void {
    // this.er.nativeElement.remove();
  }

  onClose() {
    this.close.emit();
  }
}
