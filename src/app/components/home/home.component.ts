import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Book } from 'src/app/models/book';
import { BookList } from 'src/app/models/book-list';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public books: Observable<BookList>;
  public filterString: string;

  public book = new Book;

  constructor(private _book_service: BookService,
    private _router: Router) { }

  ngOnInit(): void {
    this.books = this._book_service.getAllBookFromRemote();
    console.log(this.books, "init");
  }

  public navigateToSelectedBook(id: number) {
    this._router.navigateByUrl(`/book/${id}`)
  }

  addBook() {
    this._book_service.addBookFromRemote(this.book).subscribe(
      (res) => {
        console.log("response received");
        window.location.reload();
        
      },
      (err) => {
        console.log("exception occured");
      }
    )
    console.log("add");
  }

  filter() {
    if (this.filterString) {
      this.books = this._book_service.filterFromRemote(this.filterString);
    } 
    else {
      this.books = this._book_service.getAllBookFromRemote();
    }
  }

}
