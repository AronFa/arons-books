import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BookListComponent } from './book-list/book-list.component';
import { NewBookComponent } from './new-book/new-book.component';

export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'book-list', component: BookListComponent},
  {path: 'new-book', component: NewBookComponent},
];
