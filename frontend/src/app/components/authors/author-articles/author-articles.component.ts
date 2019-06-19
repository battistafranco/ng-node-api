import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ArticleModel } from 'src/app/models/ArticleModel';

@Component({
  selector: 'app-author-articles',
  templateUrl: './author-articles.component.html',
  styleUrls: ['./author-articles.component.css']
})
export class AuthorArticlesComponent implements OnInit {
  title: string;
  articles$: Observable<ArticleModel[]>;
  constructor(private articleService: ArticleService, private router: Router) { }

  ngOnInit() {
    let authorId = localStorage.getItem("authorId");
    if (!authorId) {
      alert("Something wrong!");
      this.router.navigate([""]);
      return;
    }
    this.title = localStorage.getItem("authorName");
    this.articles$ = this.articleService.getAllArticlesByAuthor(authorId);

  }

  edit(articleId)
  {
    localStorage.removeItem("articleId");
    localStorage.setItem("articleId", articleId);
    this.router.navigate(["edit-article"]);
  }



}
