import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { Router } from "@angular/router";
import { AuthorModel } from "../../../models/AuthorModel";
import { AuthorService } from "../../../services/author.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-list-authors",
  templateUrl: "./list-authors.component.html",
  styleUrls: ["./list-authors.component.css"]
})
export class ListAuthorsComponent implements OnInit {  
  
  authors$: Observable<AuthorModel[]>;
  
  constructor(private authorService: AuthorService, private router: Router, private authorsService : AuthorService) {}

  ngOnInit() {
    this.getAuthors();
  }

  getAuthors(): void {
    this.authors$ = this.authorsService.selectedAuthors$;
  }

  delete(id) {
    this.authorService.deleteAuthor(id);
  }


}
