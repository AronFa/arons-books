import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Book } from '../service/book';
import { Genre } from '../service/genre';


@Component({
  selector: 'app-new-book-from',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor,
    MatInputModule, MatFormFieldModule, MatSelectModule, MatButtonModule, MatCardModule],
  templateUrl: './new-book-form.component.html',
  styleUrl: './new-book-form.component.scss'
})
export class NewBookFormComponent {
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
