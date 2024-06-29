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
