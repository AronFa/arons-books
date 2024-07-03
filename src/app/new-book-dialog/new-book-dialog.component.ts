import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { NewBookFormComponent } from '../new-book-form/new-book-form.component';

@Component({
  selector: 'app-new-book-dialog',
  standalone: true,
  imports: [NewBookFormComponent, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './new-book-dialog.component.html',
  styleUrl: './new-book-dialog.component.scss'
})
export class NewBookDialogComponent {
  // TODO - on clicking away from a partially filled dialog request confirmation

}
