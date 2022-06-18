import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { BookComponent } from './book/book.component';
import { BooksComponent } from './books/books.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { AddBookComponent } from './add-book/add-book.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditBookComponent } from './edit-book/edit-book.component';
import { AuthorComponent } from './author/author.component';
import { EditAuthorComponent } from './edit-author/edit-author.component';
import { AddAuthorComponent } from './add-author/add-author.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    BookComponent,
    BooksComponent,
    NavigationComponent,
    AddBookComponent,
    EditBookComponent,
    AuthorComponent,
    EditAuthorComponent,
    AddAuthorComponent,
    ErrorPageComponent,
    RegisterComponent,
    LoginComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'books',
        component: BooksComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'books/add',
        component: AddBookComponent,
      },
      {
        path: 'books/:bookId',
        component: BookComponent,
      },
      {
        path: 'books/:bookId/edit',
        component: EditBookComponent,
      },
      {
        path: 'books/:bookId/author/:authorId',
        component: AuthorComponent,
      },
      {
        path: 'books/:bookId/author/:authorId/edit',
        component: EditAuthorComponent,
      },
      {
        path: 'books/:bookId/add',
        component: AddAuthorComponent,
      },

      {
        path: '**',
        component: ErrorPageComponent,
      },
    ]),
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
