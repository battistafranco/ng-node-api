import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArticleModel } from '../models/ArticleModel';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {


  constructor(private http: HttpClient) { }

  baseurl: string = "http://localhost:3000/";

  getAllArticles() {
    return this.http.get<ArticleModel[]>(this.baseurl + 'articles');
  }


  getAllArticlesByTitle(title) {
    console.log(title);
    return this.http.get<ArticleModel[]>(this.baseurl + 'articlesByTitle' + '/' + title);
  }

  getAllArticlesByAuthor(author: string) {
    return this.http.get<ArticleModel[]>(this.baseurl + 'articlesByAuthor' + '/' + author);
  }

  getArticleById(id: string) {
    return this.http.get<ArticleModel>(this.baseurl + 'articles' + '/' + id);
  }

  addArticle(article: ArticleModel) {
    return this.http.post(this.baseurl + 'articles', article);
  }

  deleteArticle(id: string) {
    return this.http.delete(this.baseurl + 'articles' + '/' + id);
  }

  updateArticle(article: ArticleModel) {
    return this.http.put(this.baseurl + 'articles' + '/' + article._id, article);
  }
}
