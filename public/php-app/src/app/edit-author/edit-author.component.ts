import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorDataService } from '../author-data.service';
import { Author } from '../books/books.component';

@Component({
  selector: 'app-edit-author',
  templateUrl: './edit-author.component.html',
  styleUrls: ['./edit-author.component.css'],
})
export class EditAuthorComponent implements OnInit {
  @ViewChild('authorForm')
  authorForm!: NgForm;

  author!: Author;
  bookId!: string;
  authorId!: string;

  constructor(
    private route: ActivatedRoute,
    private authorService: AuthorDataService,
    private router: Router
  ) {
    this.author = new Author('', '', '');
  }

  ngOnInit(): void {
    this.bookId = this.route.snapshot.params['bookId'];
    this.authorId = this.route.snapshot.params['authorId'];
    this.authorService
      .getAuthor(this.bookId, this.authorId)
      .subscribe((author) => {
        this.author = author;
      });
  }

  editAuthor(authorForm: NgForm): void {
    this.authorService
      .updateAuthor(this.bookId, this.authorId, this.authorForm.value)
      .subscribe({
        next: (x) =>
          console.log(
            `form submitted for id:${this.bookId} authorId: ${this.authorId}`,
            this.authorForm.value
          ),
        error: (err) => console.log('err', err),
        complete: () =>
          this.router.navigate([
            `books/${this.bookId}/author/${this.authorId}`,
          ]),
      });
  }
}
