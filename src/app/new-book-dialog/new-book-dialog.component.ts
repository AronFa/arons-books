import { ChangeDetectionStrategy, Component, EventEmitter, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { BookFormComponent } from '../book-form/book-form.component';
import { Book } from '../service/book';

@Component({
  selector: 'app-new-book-dialog',
  standalone: true,
  imports: [
    BookFormComponent,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatCardModule,
    MatDividerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './new-book-dialog.component.html',
  styleUrl: './new-book-dialog.component.scss'
})
export class NewBookDialogComponent {
  public requestCancel = new EventEmitter<Book>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public book: Book,
    private newBookDialogRef: MatDialogRef<NewBookDialogComponent>
  ) { }

  close() {
    this.newBookDialogRef.close();
  }

  handleCancelRequest(formState: Book) {
    console.log("new-book-dialog component recieved cancel Request w formstate")
    console.log(formState);
    this.requestCancel.emit(formState);
  }

}
