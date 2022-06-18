import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Book } from './books/books.component';

@Injectable({
  providedIn: 'root',
})
export class BooksDataService {
  private baseUrl: string = 'http://localhost:4343/api';

  constructor(private http: HttpClient) {}

  public getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.baseUrl + '/books');
  }
  public getBook(id: string): Observable<Book> {
    return this.http.get<Book>(this.baseUrl + '/books/' + id);
  }
  public deleteBook(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + '/books/' + id);
  }
  public createBook(book: Book): Observable<any> {
    return this.http.post(this.baseUrl + '/books/', book);
  }
  public updateBook(book: Book, id: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/books/${id}`, book);
  }
}
