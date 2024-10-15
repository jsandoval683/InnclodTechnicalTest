import { Component, inject, model } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

export interface DialogData {
  taskId: number
}

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [MatDialogActions, MatDialogContent, MatDialogClose, MatButtonModule, MatDialogTitle],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.scss'
})
export class DeleteDialogComponent {

  readonly dialogRef = inject(MatDialogRef<DeleteDialogComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly tasktId = model<number>(this.data.taskId);

}