import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
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

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks(): void {
    this.dataSource = this.bookService.getBooks();
  }

  editBook(book: Book): void {
    console.log('Edit book:', book);
    // Implement edit logic here
  }

  addBook() {
    console.log('Add new book');
  }

}
