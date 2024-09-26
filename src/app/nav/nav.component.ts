import { ChangeDetectionStrategy, Component, inject, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { NewBookDialogComponent } from '../new-book-dialog/new-book-dialog.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule, MatToolbarModule, MatMenuModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  readonly menuTrigger = viewChild.required(MatMenuTrigger);

  readonly dialog = inject(MatDialog);

  openNewBookDialog() {
    const dialogRef = this.dialog.open(NewBookDialogComponent, {
      restoreFocus: false,
      width: '80%',
      maxWidth: '1200px'
    });

    // Manually restore focus to the menu trigger since the element that
    // opens the dialog won't be in the DOM any more when the dialog closes.
    dialogRef.afterClosed().subscribe(() => this.menuTrigger().focus());
  }

}
