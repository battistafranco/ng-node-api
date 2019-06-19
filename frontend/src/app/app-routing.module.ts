import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ListArticlesComponent } from './components/articles/list-articles/list-articles.component';
import { EditArticleComponent } from './components/articles/edit-article/edit-article.component';
import { AddArticleComponent } from './components/articles/add-article/add-article.component';
import { AuthorsComponent } from './components/authors/authors/authors.component';
import { AuthorArticlesComponent } from './components/authors/author-articles/author-articles.component';


const routes: Routes = [
  { path: 'add-article', component: AddArticleComponent },
  { path: 'edit-article', component: EditArticleComponent},
  { path: 'authors', component: AuthorsComponent },
  { path: 'articles', component: ListArticlesComponent },
  { path: 'author-articles', component: AuthorArticlesComponent },
  { path: '', component: ListArticlesComponent, pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
