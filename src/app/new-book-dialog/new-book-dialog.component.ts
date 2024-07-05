import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { BookFormComponent } from '../book-form/book-form.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-book-dialog',
  standalone: true,
  imports: [BookFormComponent, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, BookFormComponent, MatCardModule, MatDividerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './new-book-dialog.component.html',
  styleUrl: './new-book-dialog.component.scss'
})
export class NewBookDialogComponent implements OnInit {
  isFormAltered = false;
  isProgrammaticClose = false;

  constructor(private dialog: MatDialog,
    private dialogRef: MatDialogRef<NewBookDialogComponent>) { }

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
