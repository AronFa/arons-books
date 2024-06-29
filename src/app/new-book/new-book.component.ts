import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Book } from '../service/book';
import { Genre } from '../service/genre';

@Component({
  selector: 'app-new-book',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './new-book.component.html',
  styleUrl: './new-book.component.scss'
})
export class NewBookComponent {
  bookForm: FormGroup;
  genres = Object.values(Genre);

  constructor(private fb: FormBuilder) {
    this.bookForm = this.fb.group({
      author: ['', [Validators.required, Validators.maxLength(100)]],
      title: ['', [Validators.required, Validators.maxLength(100)]],
      publisher: ['', [Validators.required, Validators.maxLength(100)]],
      year: ['', [Validators.required, Validators.pattern("^[0-9]{4}$"), this.yearValidator]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      genre: ['', Validators.required]
    });

    console.log('Genres:', this.genres);
  }

  yearValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const currentYear = new Date().getFullYear();
    if (control.value && control.value > currentYear) {
      return { 'futureYear': true };
    }
    return null;
  }

  onSubmit() {
    if (this.bookForm.valid) {
      const newBook: Book = this.bookForm.value;
      console.log('New Book:', newBook);
      // Handle the book registration logic here
    } else {
      console.log('Form is invalid');
    }
  }

}
