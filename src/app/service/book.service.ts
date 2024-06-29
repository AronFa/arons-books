import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { mapBookData } from '../util/book-mapper.util';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  //TODO: add api-book-response.interface.ts & change name of book.ts to book.interface.ts 
  //      (i mean if this is a thing in angular - i hope it is though)

  getBooks(): Observable<Book[]> {
    return this.http.get<any[]>(this.apiUrl + '/books').pipe(
      map(response => Object.entries(response).map(([id, data]) => mapBookData({ [id]: data })))
    );
  }

}
