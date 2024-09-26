import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { isEmpty } from 'lodash';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { NewBookDialogComponent } from '../new-book-dialog/new-book-dialog.component';
import { Book } from '../service/book';

@Component({
  selector: 'app-new-book',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './new-book.component.html',
  styleUrl: './new-book.component.scss'
})
export class NewBookComponent {

  @Output() newBookDialogClosed = new EventEmitter();

  readonly dialog = inject(MatDialog);
  formState!: Book;

  newBook(): void {
    const newBookDialogRef = this.dialog.open(NewBookDialogComponent, {
      width: '80%',
      maxWidth: '1200px',
      disableClose: true
    })

    newBookDialogRef.backdropClick().subscribe(() => {
      console.log("backdrop-click recieved");
      this.hadleCancelConfirmation(newBookDialogRef);
    })

    newBookDialogRef.componentInstance.requestCancel.subscribe((formState: Book) => {
      console.log("new-book component recieved cancel with formState" + formState);
      this.formState = formState;
      this.hadleCancelConfirmation(newBookDialogRef);
    })

    newBookDialogRef.afterClosed().subscribe(() => {
      this.newBookDialogClosed.emit();
    })

  }

  private hadleCancelConfirmation(newBookDialogRef: MatDialogRef<NewBookDialogComponent, any>): void {
    if (isEmpty(this.formState)) {
      newBookDialogRef.close();
      return;
    } else {
      const confirmDialogRef = this.dialog.open(ConfirmDialogComponent);

      confirmDialogRef.backdropClick().subscribe(() => {
        confirmDialogRef.close('cancel');
      })

      confirmDialogRef.afterClosed().subscribe(result => {
        switch (result) {
          case 'confirm': return newBookDialogRef.close();
          case 'cancel': return;
          default: console.error("invalid response from confrimDialog: ", result);
        }
      });
    }
  }
}


