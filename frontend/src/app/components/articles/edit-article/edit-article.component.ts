import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";

import { first, tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { ArticleModel } from "src/app/models/ArticleModel";
import { ArticleService } from "src/app/services/article.service";
import { Observable } from "rxjs";
import { AuthorService } from "src/app/services/author.service";
import { AuthorModel } from "src/app/models/AuthorModel";

@Component({
  selector: "app-edit-article",
  templateUrl: "./edit-article.component.html",
  styleUrls: ["./edit-article.component.css"]
})
export class EditArticleComponent implements OnInit {
  article: ArticleModel;
  editForm: FormGroup;
  submitted = false;
  data$: Observable<ArticleModel>;
  authors$: Observable<AuthorModel[]>;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private articleService: ArticleService,
    private authorService: AuthorService
  ) {}

  ngOnInit() {
    let articleId = localStorage.getItem("articleId");
    if (!articleId) {
      alert("Something wrong!");
      this.router.navigate([""]);
      return;
    }

    this.editForm = this.formBuilder.group({
      _id: [],
      title: ["", Validators.required],
      long_description: ["", Validators.required],
      short_description: ["", Validators.required],
      selectedAuthor: [""]
    });

    this.getAllAuthors();

    this.data$ = this.articleService.getArticleById(articleId).pipe(
      tap(article => {
        this.editForm.patchValue(article);
        this.authorService.addAuthors(article.authors);
      })
    );
  }

  // get the form short name to access the form fields
  get f() {
    return this.editForm.controls;
  }

  onSubmit() {
    this.submitted = true;    
    if (this.editForm.valid) {
      this.article = this.editForm.value;
      this.article.authors = this.authorService.getSelectedAuthorsIds();    

      this.articleService.updateArticle(this.article).subscribe(data => {
        console.log(data);
        this.authorService.clearSelected();
        this.router.navigate(["articles"]);
      });
    }
  }

  getAllAuthors(): void {
    this.authorService.loadAllAuthors();
    this.authors$ = this.authorService.authors;
  }

  addAuthor() {
    let id = this.editForm.value.selectedAuthor;
    if (id != "") {
      this.authorService.addAuthors(id);
    }
  }
}
