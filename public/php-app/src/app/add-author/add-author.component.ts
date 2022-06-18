import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorDataService } from '../author-data.service';
import { Author } from '../books/books.component';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.css'],
})
export class AddAuthorComponent implements OnInit {
  @ViewChild('authorForm')
  authorForm!: NgForm;

  author!: Author;
  bookId!: string;

  constructor(
    private route: ActivatedRoute,
    private authorService: AuthorDataService,
    private router: Router
  ) {
    this.author = new Author('', '', '');
  }

  ngOnInit(): void {
    this.bookId = this.route.snapshot.params["bookId"];
  }

  addAuthor(authorForm: NgForm): void {
    console.log("called", authorForm.value);
    this.authorService.createAuthor(this.bookId,authorForm.value).subscribe({
      next: (x) => console.log("form submitted",x),
      error: err => console.log("err",err),
      complete: () => this.router.navigate([`books/${this.bookId}`])
    });
  }
}
