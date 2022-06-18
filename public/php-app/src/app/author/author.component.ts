import { Component, OnInit } from '@angular/core';

import { Author, Book } from '../books/books.component';
import { AuthorDataService } from '../author-data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css'],
})
export class AuthorComponent implements OnInit {
  author!: Author;
  // bookId!: string;
  book!: Book;

  constructor(
    private route: ActivatedRoute,
    private authorService: AuthorDataService,
    private router: Router
  ) {
    this.author = new Author('', '', '');
  }

  ngOnInit(): void {
    const bookId: string = this.route.snapshot.params['bookId'];
    const authorId = this.route.snapshot.params['authorId'];
    this.authorService.getAuthor(bookId, authorId).subscribe((author) => {
      this.author = author;
    });
  }
  bookId = this.route.snapshot.params['bookId'];

  delete(bookId: string, authorId: string): void {
    bookId = this.route.snapshot.params['bookId'];
    this.authorService.deleteAuthor(bookId, authorId).subscribe({
      next: (res) => console.log('res', res),
      error: (err) => console.log(err),
      complete: () => {
        this.router.navigate([`books/${bookId}/author`]);
      },
    });
  }
}
