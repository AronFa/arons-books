import { Routes } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'book-list', component: BookListComponent },
  // { path: 'new-book', component: NewBookFormComponent }, TODO add a new-book route
];
