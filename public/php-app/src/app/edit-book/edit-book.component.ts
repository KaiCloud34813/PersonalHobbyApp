import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksDataService } from '../books-data.service';
import { Book } from '../books/books.component';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css'],
})
export class EditBookComponent implements OnInit {
  @ViewChild('bookForm')
  bookForm!: NgForm;

  book!: Book;
  bookId!: string;

  constructor(
    private route: ActivatedRoute,
    private bookService: BooksDataService,
    private router: Router
  ) {
    this.book = new Book('', '', 0, 0);
  }

  ngOnInit(): void {
    this.bookId = this.route.snapshot.params['bookId'];
    this.getBook();
  }
  getBook(): void {
    this.bookService.getBook(this.bookId).subscribe((book) => {
      this.book = book;
    });
  }
  editBook(bookForm: NgForm): void {
    // bookForm.value = this.book;
    const bookId = this.route.snapshot.params['bookId'];
    this.bookService.updateBook(bookForm.value, this.bookId).subscribe({
      next: (x) => console.log('form submitted', x),
      error: (err) => console.log('err', err),
      complete: () => this.router.navigate(['books/' + this.bookId])
      // .then(() => window.location.reload()),
    });
  }
}
