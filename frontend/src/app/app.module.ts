import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleService } from './services/article.service';
import { ListArticlesComponent } from './components/articles/list-articles/list-articles.component';
import { AddArticleComponent } from './components/articles/add-article/add-article.component';
import { EditArticleComponent } from './components/articles/edit-article/edit-article.component';
import { ListAuthorsComponent } from './components/authors/list-authors/list-authors.component';
import { AuthorsComponent } from './components/authors/authors/authors.component';
import { AuthorArticlesComponent } from './components/authors/author-articles/author-articles.component';



@NgModule({
  declarations: [
    AppComponent,
    ListArticlesComponent,
    AddArticleComponent,
    EditArticleComponent,
    ListAuthorsComponent,
    AuthorsComponent,
    AuthorArticlesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ArticleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
