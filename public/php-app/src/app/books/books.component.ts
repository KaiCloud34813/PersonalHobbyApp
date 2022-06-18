import { Component, OnInit } from '@angular/core';
import { BooksDataService } from '../books-data.service';

export class Author {
  #_id!: string;
  #name!: string;
  #country!: string;
  get _id() {
    return this.#_id;
  }
  get name() {
    return this.#name;
  }
  get country() {
    return this.#country;
  }
  set name(name: string) {
    this.#name = name;
  }
  set country(country: string) {
    this.#country = country;
  }

  constructor(id: string, name: string, country: string) {
    this.#_id = id;
    this.#name = name;
    this.#country = country;
  }
}

export class Book {
  #_id!: string;
  #title!: string;
  #year!: number;
  #pages!: number;
  #author!: Author[];
  get _id() {
    return this.#_id;
  }
  get title() {
    return this.#title;
  }
  get pages() {
    return this.#pages;
  }
  get year() {
    return this.#year;
  }
  set title(title: string) {
    this.#title = title;
  }
  set year(year: number) {
    this.#year = year;
  }
  set pages(pages: number) {
    this.#pages = pages;
  }
  set author(author: Author[]) {
    this.#author = author;
  }
  constructor(id: string, title: string, year: number, pages: number) {
    this.#_id = id;
    this.#title = title;
    this.#year = year;
    this.#pages = pages;
    this.#author = [];
  }
}

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  books: Book[] = [];
  constructor(private booksService: BooksDataService) {}

  ngOnInit(): void {
    this.booksService.getBooks().subscribe((books) => (this.books = books));
  }

  // getBooks(): void {
  //   this.booksService.getBooks().subscribe({
  //     next: (book) => (this.books = book),
  //     error: (err) => console.log(err),
  //     complete: () => console.log('got books', this.books),
  //   });
  // }
}
