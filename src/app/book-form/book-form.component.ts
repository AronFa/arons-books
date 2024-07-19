import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Book } from '../service/book';
import { BookService } from '../service/book.service';
import { Genre } from '../service/genre';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgFor,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule
  ],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss'
})
export class BookFormComponent implements OnInit {

  bookForm!: FormGroup;
  genres = Object.values(Genre);

  @Input() book?: Book;

  @Output() closeDialog = new EventEmitter();
  @Output() requestCancel = new EventEmitter<Book>();

  constructor(
    private fb: FormBuilder,
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      id: [null],
      author: ['', [Validators.required, Validators.maxLength(100)]],
      title: ['', [Validators.required, Validators.maxLength(100)]],
      publisher: ['', [Validators.required, Validators.maxLength(100)]],
      year: ['', [Validators.required, Validators.pattern("^[0-9]{4}$"), this.yearValidator]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      genre: ['', Validators.required]
    });

    if (this.book) {
      this.setFormData();
    }

  }

  onSubmit() {
    if (this.bookForm.valid) {
      const formState: Book = this.bookForm.value;
      if (this.book && this.book.id) {
        this.bookService.updateBook(this.book.id, formState).subscribe({
          next: updatedBook => {
            console.log('Book updated successfully', updatedBook);
          },
          error: err => {
            console.error('Error updating book', err);
          }
        });
      } else {
        this.bookService.addBook(formState).subscribe({
          next: addedBook => {
            console.log('Book added successfully', addedBook);
          },
          error: err => {
            console.error('Error adding book', err);
          }
        });
      }
      this.closeDialog.emit();

    } else {
      console.log('Form is invalid');
    }
  }

  onCancel() {
    console.log("bookform emited a cancel request")
    this.requestCancel.emit(this.bookForm.value);
  }

  onClear() {
    this.bookForm.reset();
    this.bookForm.markAsPristine(); // todo: i don't think it works atm
  }

  setFormData() {
    if (this.book && this.bookForm) {
      this.bookForm.patchValue({
        id: this.book.id || null,
        author: this.book.author,
        title: this.book.title,
        publisher: this.book.publisher,
        year: this.book.year,
        description: this.book.description,
        genre: this.book.genre
      });
    }
  }

  yearValidator(control: AbstractControl): { [key: string]: boolean; } | null {
    const currentYear = new Date().getFullYear();
    if (control.value && control.value > currentYear) {
      return { 'futureYear': true };
    }
    return null;
  }

  // todo: backend apparently validates that author has a ' ' with a non-zero index.
}
