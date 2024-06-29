import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Book } from '../service/book';
import { Genre } from '../service/genre';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [RouterLink, NgFor, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit {

  displayedColumns: string[] = ['author', 'title', 'publisher', 'year', 'description', 'genre', 'edit'];
  dataSource = BOOK_DATA;

  ngOnInit(): void {
    // Fetch or set your data here
  }

  editBook(book: Book): void {
    console.log('Edit book:', book);
    // Implement your edit logic here
  }

  addBook() {
    console.log('Add new book');
  }
}

const BOOK_DATA: Book[] = [
  {
    id: 1,
    author: 'Author 1',
    title: 'Title 1',
    publisher: 'Publisher 1',
    year: 2020,
    description: 'Description 1',
    genre: Genre.ChildrenStory
  },
];
