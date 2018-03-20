import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Repository } from '../models/repository';

@Injectable()
export class GitHubApiService {

    BASE_URL: string = 'https://api.github.com/search/repositories?';
    FETCH_URL: string;

    constructor(private http: Http) { }

    getRepositories(searchKeyword: string, stars: number, license: string, fork: boolean): Observable<Repository[]> {
        this.FETCH_URL = `${this.BASE_URL}q=${searchKeyword}&stars=${stars}&license=${license}&fork=${fork}`; 
        return this.http.get(this.FETCH_URL)
                        .map((response: Response) => <Repository[]>response.json().items)
                        .catch(this.handleError);
    }

    handleError (error: Response) {
        console.error(error);
        return Observable.throw(error);
    }
    
}