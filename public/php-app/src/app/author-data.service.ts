import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Author } from './books/books.component';

@Injectable({
  providedIn: 'root',
})
export class AuthorDataService {
  private baseUrl: string = 'http://localhost:4343/api';

  constructor(private http: HttpClient) {}

  public getAuthors(bookId: string): Observable<Author[]> {
    return this.http.get<Author[]>(`${this.baseUrl}/books/${bookId}/author`);
  }

  public getAuthor(bookId: string, authorId: string): Observable<Author> {
    return this.http.get<Author>(
      `${this.baseUrl}/books/${bookId}/author/${authorId}`
    );
  }

  public deleteAuthor(bookId: string, authorId: string): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}/books/${bookId}/author/${authorId}`
    );
  }

  public createAuthor(bookId: string, author: Author): Observable<any> {
    return this.http.post(`${this.baseUrl}/books/${bookId}/author`, author);
  }

  public updateAuthor(bookId: string, authorId: string, author: Author): Observable<any> {
    return this.http.put(`${this.baseUrl}/books/${bookId}/author/${authorId}`, author);
  }
}
