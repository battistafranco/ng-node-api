import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthorModel } from "../models/AuthorModel";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthorService {
  private _authors$: BehaviorSubject<AuthorModel[]>;
  authors: Observable<AuthorModel[]>;

  private _selectedAuthors$: BehaviorSubject<AuthorModel[]>;
  selectedAuthors$: Observable<AuthorModel[]>;

  private dataStore: {
    // This is where we will store our data in memory
    authors: AuthorModel[];
    selectedAuthors: AuthorModel[];
  };
  constructor(private http: HttpClient) {
    this.dataStore = { authors: [], selectedAuthors: [] };

    this._authors$ = <BehaviorSubject<AuthorModel[]>>new BehaviorSubject([]);
    this._selectedAuthors$ = <BehaviorSubject<AuthorModel[]>>(
      new BehaviorSubject([])
    );

    this.selectedAuthors$ = this._selectedAuthors$.asObservable().pipe(
      tap(arr => {
        const uniqueSet = new Set(arr);        
        return Array.from(uniqueSet);
      })
    );
    this.authors = this._authors$.asObservable();
  }

  baseurl: string = "http://localhost:3000/";

  loadAllAuthors() {
    return this.http.get<AuthorModel[]>(this.baseurl + "authors").subscribe(
      data => {
        this.dataStore.authors = data;
        this._authors$.next(Object.assign({}, this.dataStore).authors);
      },
      error => console.log("Could not load Authors.")
    );
  }

  getSelectedAuthorsIds(): string[] {
    return this.dataStore.selectedAuthors.map(a => a._id);
  }

  clearSelected() {
    this.dataStore.selectedAuthors = [];
    this._selectedAuthors$.next(
      Object.assign({}, this.dataStore).selectedAuthors
    );
  }

  addAuthors(authorsIds) {
    let auth = this.dataStore.authors.filter(b => authorsIds.includes(b._id));
    auth.forEach(a => {
      if (this.dataStore.selectedAuthors.filter(b => b._id === a._id).length === 0) {
        this.dataStore.selectedAuthors.push(a);
      }
    });
    this._selectedAuthors$.next(
      Object.assign({}, this.dataStore).selectedAuthors
    );
  }

  deleteAuthor(authorId) {
    this.dataStore.selectedAuthors = this.dataStore.selectedAuthors.filter(
      a => a._id !== authorId
    );
    this._selectedAuthors$.next(
      Object.assign({}, this.dataStore).selectedAuthors
    );
  }
}
