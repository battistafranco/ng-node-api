import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ArticleModel } from "../../../models/ArticleModel";
import { ArticleService } from "../../../services/article.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-list-articles",
  templateUrl: "./list-articles.component.html",
  styleUrls: ["./list-articles.component.css"]
})
export class ListArticlesComponent implements OnInit {
  articles$: Observable<ArticleModel[]>;
  searchField: string;
  constructor(private articleService: ArticleService, private router: Router) {}

  ngOnInit() {
    this.getAllArticles();
  }

  getAllArticles(): void {
    this.articles$ = this.articleService.getAllArticles();
  }

  addArticle(): void {
    this.router.navigate(["add-article"]);
  }

  deleteArticle(article: ArticleModel) {
    this.articleService.deleteArticle(article._id).subscribe(data => {
      console.log(data);
      this.getAllArticles();
    });
  }

  search() {
    if (this.searchField !== "") {
      this.articles$ = this.articleService.getAllArticlesByTitle(
        this.searchField
      );
    } else {
      this.articles$ = this.articleService.getAllArticles();
    }
  }

  clear() {
    this.articles$ = this.articleService.getAllArticles();
  }

  updateArticle(article: ArticleModel) {
    localStorage.removeItem("articleId");
    localStorage.setItem("articleId", article._id);
    this.router.navigate(["edit-article"]);
  }
}
