import { NgFor } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { EditBookDialogComponent } from '../edit-book-dialog/edit-book-dialog.component';
import { NewBookDialogComponent } from '../new-book-dialog/new-book-dialog.component';
import { Book } from '../service/book';
import { BookService } from '../service/book.service';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [RouterLink, NgFor, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit {
  displayedColumns: string[] = ['author', 'title', 'publisher', 'year', 'description', 'genre', 'edit'];
  dataSource!: Observable<Book[]>;

  readonly dialog = inject(MatDialog);

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks(): void {
    this.dataSource = this.bookService.getBooks();
  }


  onAddNewBook() {
    const dialogRef = this.dialog.open(NewBookDialogComponent, {
      width: '80%',
      maxWidth: '1200px'
    });
  }

  editBook(book: Book): void {
    const dialogRef = this.dialog.open(EditBookDialogComponent, {
      width: '80%',
      maxWidth: '1200px',
      data: [book],
    });

    dialogRef.componentInstance.reopenWithFormState.subscribe((initData: Book[]) => {
      console.log("subscription \"reopenWithFormState\" called w. params:")
      console.log(initData);
      if (initData) {
        dialogRef.close();
        this.reopenDialog(initData);
      }
    });
  }

  reopenDialog(initData: Book[]): void {
    const dialogRef = this.dialog.open(EditBookDialogComponent, {
      width: '80%',
      maxWidth: '1200px',
      data: initData,
    });

    dialogRef.componentInstance.reopenWithFormState.subscribe((initData: Book[]) => {
      console.log("subscription \"reopenWithFormState\" called w. params:")
      console.log(initData);
      if (initData) {
        dialogRef.close();
        this.reopenDialog(initData);
      }
    });
  }


}
