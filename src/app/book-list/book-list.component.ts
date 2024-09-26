import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';
import { EditBookComponent } from '../edit-book/edit-book.component';
import { NewBookDialogComponent } from '../new-book-dialog/new-book-dialog.component';
import { NewBookComponent } from "../new-book/new-book.component";
import { Book } from '../service/book';
import { BookService } from '../service/book.service';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, EditBookComponent, NewBookComponent, NewBookComponent],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class BookListComponent implements OnInit {
  displayedColumns: string[] = ['title', 'author', 'genre'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  dataSource!: Observable<Book[]>;
  expandedElement: Book | null = null;

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

    dialogRef.afterClosed().subscribe(() => {
      this.fetchBooks();
    });
  }

  toggleExpandRow(book: Book): void {
    this.expandedElement = this.expandedElement === book ? null : book;
  }
}
