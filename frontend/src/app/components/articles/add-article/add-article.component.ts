import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";

import { Router } from "@angular/router";
import { ArticleService } from "src/app/services/article.service";
import { Observable } from "rxjs";
import { AuthorModel } from "src/app/models/AuthorModel";
import { AuthorService } from "src/app/services/author.service";
import { ArticleModel } from "src/app/models/ArticleModel";

@Component({
  selector: "app-add-article",
  templateUrl: "./add-article.component.html",
  styleUrls: ["./add-article.component.css"]
})
export class AddArticleComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private articleService: ArticleService,
    private authorService: AuthorService
  ) {}
  article: ArticleModel;
  addForm: FormGroup;
  submitted = false;
  authors$: Observable<AuthorModel[]>;

  ngOnInit() {
    this.authorService.clearSelected();
    this.getAllAuthors();
    this.addForm = this.formBuilder.group({
      _id: [],
      title: ["", Validators.required],
      short_description: ["", Validators.required],
      long_description: ["", Validators.required],
      selectedAuthor: [""]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.addForm.valid) {
      this.article = this.addForm.value;
      this.article.authors = this.authorService.getSelectedAuthorsIds();
      this.articleService.addArticle(this.addForm.value).subscribe(data => {
        console.log(data);
        this.authorService.clearSelected();
        this.router.navigate(["articles"]);
      });
    }
  }

  // get the form short name to access the form fields
  get f() {
    return this.addForm.controls;
  }

  getAllAuthors(): void {
    this.authorService.loadAllAuthors();
    this.authors$ = this.authorService.authors;
  }

  addAuthor() {
    let id = this.addForm.value.selectedAuthor;
    if (id != "") {
      this.authorService.addAuthors(id);
    }
  }
}
