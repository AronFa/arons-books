import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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
export class BookFormComponent implements OnInit, OnChanges {

  bookForm!: FormGroup;
  genres = Object.values(Genre);

  @Input() book!: Book;
  @Output() cancel = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    this.bookForm = this.fb.group({
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['book'] && this.book) {
      this.setFormData();
    }
  }

  onCancel($event: Event) {
    $event.preventDefault();
    $event.stopPropagation();
    this.cancel.emit();
  }

  onClear() {
    this.bookForm.reset();
    this.bookForm.markAsPristine();
  }

  onSubmit() {
    if (this.bookForm.valid) {
      const newBook: Book = this.bookForm.value;
      if (this.book && this.book.id) {
        this.bookService.updateBook(this.book.id, newBook).subscribe({
          next: updatedBook => {
            console.log('Book updated successfully', updatedBook);
          },
          error: err => {
            console.error('Error updating book', err);
          }
        });
      } else {
        this.bookService.addBook(newBook).subscribe({
          next: addedBook => {
            console.log('Book added successfully', addedBook);
          },
          error: err => {
            console.error('Error adding book', err);
          }
        });
      }
    } else {
      console.log('Form is invalid');
    }
  }

  setFormData() {
    if (this.book && this.bookForm) {
      this.bookForm.patchValue({
        author: this.book.author,
        title: this.book.title,
        publisher: this.book.publisher,
        year: this.book.year,
        description: this.book.description,
        genre: this.book.genre
      });
      //todo: what about the id?
    }
  }

  yearValidator(control: AbstractControl): { [key: string]: boolean; } | null {
    const currentYear = new Date().getFullYear();
    if (control.value && control.value > currentYear) {
      return { 'futureYear': true };
    }
    return null;
  }
}
