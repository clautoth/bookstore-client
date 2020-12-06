import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { Comment } from 'src/app/models/comment';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  public book: Book;
  public sub: any;
  public id: number;
  public currentRate: number;
  public commentString: string;
  public comment = new Comment;

  constructor(private _book_service: BookService,
    private _router: Router, private route: ActivatedRoute,
) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params) => {
      this.id = params["id"];
      
      this._book_service.getBookFromRemote(this.id).subscribe(
        (res) => {
          this.book = res;
          //AFTER JWT put the current userId to the ()!!!!!!!
          // this.currentRate = this.book.ratings.get();
          this.currentRate = 0;
          console.log(this.book);
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }

  deleteBook() {
    console.log(this.book.id);
    this._book_service.deleteBookFromRemote(this.book.id).subscribe(
      (res) => {
        console.log("response received");
        this._router.navigate(["/home"]);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  modifyBook() {
    this._book_service.modifyBookFromRemote(this.book).subscribe(
      (res) => {
        console.log("response received");
        window.location.reload()
      },
      (err) => {
        console.log("exception occured");
      }
    )
    console.log("modify");
  }

  addBookToList() {
    //TODO
    console.log("addtolist");
  }

  //TODO!!!
  rateBook() {
    this.currentRate = parseInt(document.getElementById("currentRate").getAttribute("aria-valuenow"));
    //KELL A JWT HOZZÁ vagy vmi user kezelés :( 
  }

  addComment() {
    this.comment.comment = this.commentString;

    this._book_service.addCommentFromRemote(this.comment, this.book.id).subscribe(
      (res) => {
        console.log("response received");
        window.location.reload();
      },
      (err) => {
        console.log("exception occured");
      }
    )
    console.log("comment");
  }
}
