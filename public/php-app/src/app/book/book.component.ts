import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksDataService } from '../books-data.service';
import { Book } from '../books/books.component';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit {
  book!: Book;

  constructor(
    private route: ActivatedRoute,
    private bookService: BooksDataService,
    private router: Router
  ) {
    this.book = new Book('', '', 0, 0);
  }

  ngOnInit(): void {
    const bookId = this.route.snapshot.params['bookId'];
    this.bookService.getBook(bookId).subscribe((book) => {
      this.book = book;
    });
  }

  delete(_id: string): void {
    this.bookService.deleteBook(_id).subscribe({
      next: (res) => console.log('res', res),
      error: (err) => console.log(err),
      complete: () => {
        this.router.navigate(['books']);
      },
    });
  }
}
