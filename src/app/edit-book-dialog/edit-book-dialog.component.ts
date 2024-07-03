import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { BookFormComponent } from '../book-form/book-form.component';
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
export class EditBookDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public book: Book) {
    console.log("injected book data:" + book);
  }

  // TODO - on clicking away from a partially filled dialog request confirmation

}
