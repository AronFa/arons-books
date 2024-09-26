import { NgFor } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { EditBookComponent } from '../edit-book/edit-book.component';
import { NewBookDialogComponent } from '../new-book-dialog/new-book-dialog.component';
import { Book } from '../service/book';
import { BookService } from '../service/book.service';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [RouterLink, NgFor, MatTableModule, MatButtonModule, MatIconModule, EditBookComponent],
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
      maxWidth: '1200px',
      disableClose: true
    });
  }

}
