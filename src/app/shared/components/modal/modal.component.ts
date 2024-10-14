import { NgTemplateOutlet } from '@angular/common';
import { Component, input, output, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

  modalTitle = input<string>();
  closeModalAction = output<boolean>();
  data = input.required<TemplateRef<any> | null>();

  closeModal = (): void => this.closeModalAction.emit(false);

}