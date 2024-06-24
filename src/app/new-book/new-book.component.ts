import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Book } from '../service/book';

@Component({
  selector: 'app-new-book',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-book.component.html',
  styleUrl: './new-book.component.scss'
})
export class NewBookComponent {
  bookForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.bookForm = this.fb.group({
      author: ['', Validators.required],
      title: ['', Validators.required],
      publisher: ['', Validators.required],
      year: ['', [Validators.required, Validators.pattern("^[0-9]{4}$")]],
      description: [''],
      genre: ['', Validators.required]
    });
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
