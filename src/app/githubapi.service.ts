import { Injectable } from "@angular/core";
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/Rx';

import { Repository } from './model/repository';

@Injectable()
export class GitHubApiService {


    BASE_URL: String = 'https://api.github.com/search/repositories?';

    repositoryLicense: String;

    repositoryForked: String;

    data: Array<Repository> = [];

    constructor(private http: Http) { }


    getRepositories(searchKeyword: String, stars: number, license: String, fork: boolean) {
        return this.http.get(`${this.BASE_URL}q=${searchKeyword}&stars=${stars}&license=${license}&fork=${fork}`)
                        .map((response: Response) => response.json().items as Repository[] );
    }
    
}