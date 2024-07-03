import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { BookFormComponent } from '../book-form/book-form.component';

@Component({
  selector: 'app-new-book-dialog',
  standalone: true,
  imports: [BookFormComponent, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, BookFormComponent, MatCardModule, MatDividerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './new-book-dialog.component.html',
  styleUrl: './new-book-dialog.component.scss'
})
export class NewBookDialogComponent {
  // TODO - on clicking away from a partially filled dialog request confirmation

}
