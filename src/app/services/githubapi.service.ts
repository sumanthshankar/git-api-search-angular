import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { catchError, retry } from 'rxjs/operators';

import { Repository } from '../models/repository';

@Injectable()
export class GitHubApiService {

    private baseURL: string = 'https://api.github.com/search/repositories?';
    private fetchURL: string;

    constructor(private http: Http, private httpClient: HttpClient) { }

    //using httpclient
    getRepositoriesOne(searchKeyword: string, stars: number, license: string, fork: boolean) {
        this.fetchURL = `${this.baseURL}q=${searchKeyword}&stars=${stars}&license=${license}&fork=${fork}`; 
        return this.httpClient.get<Repository[]>(this.fetchURL)
                              .pipe(
                                retry(2),
                                catchError(this.handleErrorOne)
                               );
    }

    handleErrorOne(error: HttpErrorResponse): Observable<Repository[]> {
        if (error instanceof ErrorEvent) {
            console.error('An error occurred: ', error.message);
        } else {
            console.error('Error Status: ' + error.status);
            console.error('Error Message: ' + error.statusText);
            console.error('Error Body: ' + error);
        }
        return new ErrorObservable('Something bad happened! Please try again later!');
    };

    //using http
    getRepositoriesTwo(searchKeyword: string, stars: number, license: string, fork: boolean): Observable<Repository[]> {
        this.fetchURL = `${this.baseURL}q=${searchKeyword}&stars=${stars}&license=${license}&fork=${fork}`; 
        return this.http.get(this.fetchURL)
                        .map((response: Response) => {
                            return <Repository[]>response.json().items
                        })
                        .catch(this.handleErrorTwo);
    }

    handleErrorTwo(error: Response) {
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