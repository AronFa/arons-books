import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { BookFormComponent } from '../book-form/book-form.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Book } from '../service/book';

@Component({
  selector: 'app-edit-book-dialog',
  standalone: true,
  imports: [
    BookFormComponent,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './edit-book-dialog.component.html',
  styleUrl: './edit-book-dialog.component.scss'
})
export class EditBookDialogComponent implements OnInit {

  isFormAltered = false;
  isProgrammaticClose = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public book: Book,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<EditBookDialogComponent>) {

  }

  ngOnInit(): void {
    this.dialogRef.beforeClosed().subscribe(() => {
      if (this.isProgrammaticClose) {
        return;
      }

      if (this.isFormAltered) {
        this.confirmCloseDialog();
      } else {
        this.isProgrammaticClose = true;
        this.dialogRef.close();
      }
    });
  }

  closeDialog(confirmNeeded: boolean): void {
    if (confirmNeeded) {
      this.confirmCloseDialog();
    } else {
      this.dialogRef.close();
    }
  }

  confirmCloseDialog(): void {
    const confirmDialogRef = this.dialog.open(ConfirmDialogComponent);

    confirmDialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.dialogRef.close();
      }
      // add navigate back on 'cancel'
    });
  }

  onFormAltered(isAltered: boolean): void {
    this.isFormAltered = isAltered;
  }

}
