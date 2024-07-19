import { ChangeDetectionStrategy, Component, EventEmitter, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
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
    public requestCancel = new EventEmitter<Book>();

    constructor(
        @Inject(MAT_DIALOG_DATA) public book: Book,
        private editDialogRef: MatDialogRef<EditBookDialogComponent>
    ) {
    }

    close() {
        this.editDialogRef.close();
    }

    handleCancelRequest(formState: Book) {
        this.requestCancel.emit(formState);
    }

}
