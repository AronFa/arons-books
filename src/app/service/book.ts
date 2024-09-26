import { Genre } from './genre';

export interface Book {
  id: string,
  author: string,
  title: string,
  publisher: string,
  year: number,
  description: string,
  genre: Genre
}

export function isEmpty(book: Book): boolean {
  return Object.values(book).every(value => value === undefined || value === null || value === '');
}
