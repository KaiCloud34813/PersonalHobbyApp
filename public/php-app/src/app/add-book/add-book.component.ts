import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BooksDataService } from '../books-data.service';
import { Book, BooksComponent } from '../books/books.component';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent implements OnInit {
  @ViewChild('bookForm')
  bookForm!: NgForm;

  book!: Book;

  constructor(private bookService: BooksDataService, private router: Router) {
    this.book = new Book('', '', 0, 0);
  }

  ngOnInit(): void {}

  addBook(bookForm: NgForm): void {
    this.bookService.createBook(bookForm.value).subscribe({
      next: (x) => console.log('form submitted', x),
      error: (err) => console.log('err', err),
      complete: () =>
        this.router.navigate(['books']).then(() => window.location.reload()),
    });
  }
}
