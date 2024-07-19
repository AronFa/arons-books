import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { isEqual } from 'lodash';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { EditBookDialogComponent } from '../edit-book-dialog/edit-book-dialog.component';
import { Book } from '../service/book';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.scss'
})
export class EditBookComponent implements OnInit {

  readonly dialog = inject(MatDialog);

  @Input() originalBook!: Book;
  @Input() formState!: Book;

  @Output() editBookDialogClosed = new EventEmitter();

  ngOnInit() {
    this.formState = this.originalBook;
  }

  editBook(): void {
    const editBookDialogRef = this.dialog.open(EditBookDialogComponent, {
      width: '80%',
      maxWidth: '1200px',
      data: this.originalBook,
      disableClose: true
    });

    editBookDialogRef.backdropClick().subscribe(() => {
      console.log("editBookDialogRef.backDropClick()")
      this.hadleCancelConfirmation(editBookDialogRef);
    })

    editBookDialogRef.componentInstance.requestCancel.subscribe((formState: Book) => {
      this.formState = formState;
    })

    editBookDialogRef.afterClosed().subscribe((bookFromState: Book) => {
      this.editBookDialogClosed.emit();
    })
  }


  private hadleCancelConfirmation(editBookDialogRef: MatDialogRef<EditBookDialogComponent, any>): void {
    console.log(this.originalBook);
    console.log(this.formState);
    if (isEqual(this.originalBook, this.formState)) {
      editBookDialogRef.close();
      return;
    } else {
      const confirmDialogRef = this.dialog.open(ConfirmDialogComponent);

      confirmDialogRef.backdropClick().subscribe(() => {
        confirmDialogRef.close('cancel');
      })

      confirmDialogRef.afterClosed().subscribe(result => {
        switch (result) {
          case 'confirm': return editBookDialogRef.close();
          case 'cancel': return;
          default: console.error("invalid response from confrimDialog: ", result);
        }
      });
    }
  }
}
