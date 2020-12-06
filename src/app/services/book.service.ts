import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/book';
import { BookList } from '../models/book-list';
import { Comment } from 'src/app/models/comment';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private _http: HttpClient) { }

  // /getallbook
  public getAllBookFromRemote(): Observable<BookList> {
    return this._http.get<BookList>("http://localhost:8090/book/getallbook")
  };

  // /book/get/{bookid}
  public getBookFromRemote(id: number): Observable<Book> {
    return this._http.get<Book>("http://localhost:8090/book/get/" + id)
  };

  // /book/upload
  public addBookFromRemote(book: Book): Observable<Book> {
    return this._http.post<Book>("http://localhost:8090/book/upload", book)
  };

  // /book/update
  public modifyBookFromRemote(book: Book): Observable<Book> {
    return this._http.put<Book>("http://localhost:8090/book/update/" + book.id, book)
  };

  // /book/del/{bookid}
  public deleteBookFromRemote(id: number): Observable<any> {
    return this._http.delete("http://localhost:8090/book/del/" + id)
  };

  // /book/find/{filterString}
  public filterFromRemote(filterString: string): Observable<BookList> {
    return this._http.get<BookList>("http://localhost:8090/book/find/" + filterString)
  };

  // /book/comment/{bookid}
  public addCommentFromRemote(comment: Comment, id: number): Observable<Book> {
    console.log(comment);
    return this._http.put<Book>("http://localhost:8090/book/comment/" + id, comment)
  };
  
}
