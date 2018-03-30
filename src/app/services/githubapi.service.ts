import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Repository } from '../models/repository';

@Injectable()
export class GitHubApiService {

    private baseURL: string = 'https://api.github.com/search/repositories?';
    private fetchURL: string;

    constructor(private http: Http) { }

    getRepositories(searchKeyword: string, stars: number, license: string, fork: boolean): Observable<Repository[]> {
        this.fetchURL = `${this.baseURL}q=${searchKeyword}&stars=${stars}&license=${license}&fork=${fork}`; 
        return this.http.get(this.fetchURL)
                        .map((response: Response) => <Repository[]>response.json().items)
                        .catch(this.handleError);
    }

    handleError(error: Response) {
        if (error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred: ', error.error.message);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
              `Backend returned code ${error.status}, ` +
              `body was: ${error}`);
          }
        return new ErrorObservable('Something bad happened! Please try again later!');
    }
    
}