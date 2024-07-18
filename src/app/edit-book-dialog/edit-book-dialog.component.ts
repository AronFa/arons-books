import { ChangeDetectionStrategy, Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import _ from 'lodash';
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
    @Output() reopenWithFormState = new EventEmitter<Book[]>();
    formState: Book | undefined;
    originalBook: Book | undefined;

    isFormAltered = false;
    cancelRequestedByForm = false;
    cancelRequestedByClickAway = false;
    cancelApproved = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) public initData: Book[],
        private dialog: MatDialog,
        private editDialogRef: MatDialogRef<EditBookDialogComponent>) {

    }

    ngOnInit(): void {
        if (this.initData.length == 1) {
            this.originalBook = _.cloneDeep(this.initData[0]);
        } else if (this.initData.length == 2) {
            this.formState = this.initData[0];
            this.originalBook = this.initData[1];
            this.isFormAltered = true;
        } else {
            console.error("Invalid init data length: " + this.initData.length);
        }

        this.editDialogRef.beforeClosed().subscribe(() => { // handles the close when the the dialog is click away from 
            console.log("beforeClosed() called");
            if (!this.cancelApproved) {
                this.openConfirmIfNeeded();
            }
        });
    }

    onCancel(): void { // to handle the dialog closing when on the form 'cancel' is clicked
        console.log("onCancel");
        if (!this.cancelApproved) {
            this.openConfirmIfNeeded();
        }
    }

    openConfirmIfNeeded() {
        if (this.isFormAltered) {
            this.confirmCloseDialog();
        } else {
            this.cancelApproved = true;
            this.editDialogRef.close();
        }
    }

    confirmCloseDialog(): void {
        console.log("confirmCloseDialog");
        const confirmDialogRef = this.dialog.open(ConfirmDialogComponent);

        confirmDialogRef.afterClosed().subscribe(result => {
            if (result === 'confirm') {

            } else if (result === 'cancel') {
                if (this.formState && this.originalBook) {
                    this.initData[0] = this.formState;
                    this.initData[1] = this.originalBook;
                    this.reopenWithFormState.emit(this.initData);
                } else {
                    console.error('Form state or original book is undefined');
                }
            }
        });

        this.cancelApproved = true;
        this.editDialogRef.close();
    }

    onFormAltered(formState: Book): void {
        this.formState = formState;
        this.isFormAltered = !_.isEqual(this.originalBook, this.formState);
    }

}
