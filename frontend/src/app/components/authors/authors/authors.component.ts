import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthorModel } from 'src/app/models/AuthorModel';
import { AuthorService } from 'src/app/services/author.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {

  authors$: Observable<AuthorModel[]>;
  constructor(private authorService: AuthorService, private router: Router) { }

  ngOnInit() {
    this.getAllAuthors();
  }


  getAllAuthors(): void {
    this.authorService.loadAllAuthors();
    this.authors$ = this.authorService.authors;
  }

  viewArticles(author) {
    localStorage.removeItem("authorName");
    localStorage.setItem("authorName", author.name);
    localStorage.removeItem("authorId");
    localStorage.setItem("authorId", author._id);
    this.router.navigate(["author-articles"]);
  }
}
