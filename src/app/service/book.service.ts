import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { mapBookDataToBook as mapToBook, mapBookToBookData as mapToBookData } from '../util/book-mapper.util';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<any[]>(`${this.apiUrl}/books`).pipe(
      map(response => Object.entries(response).map(([id, data]) => mapToBook({ [id]: data })))
    );
  }

  addBook(book: Book): Observable<Book> {
    const bookData = mapToBookData(book);
    console.log(bookData);
    return this.http.post<Book>(`${this.apiUrl}/books`, bookData);
  }

  updateBook(id: string, book: Book): Observable<Book> {
    const bookData = mapToBookData(book);
    return this.http.put<Book>(`${this.apiUrl}/books/${id}`, bookData);
  }
}
