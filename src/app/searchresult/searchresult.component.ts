import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, Event, NavigationEnd } from '@angular/router';
import { NgProgress } from 'ngx-progressbar';
import { Observable } from 'rxjs/Observable';

import { GitHubApiService } from '../githubapi.service';
import { Repository } from '../model/repository';

@Component({
  selector: 'searchresult-component',
  templateUrl: './searchresult.component.html',
  styleUrls: ['./searchresult.component.css']
})

export class SearchResultComponent implements OnInit {

  public repositories: Repository[];

  public q: String;
  public stars: number;
  public license: String;
  public fork: boolean;

  constructor(public githubApiService: GitHubApiService, 
              public router: Router, 
              public activatedRoute: ActivatedRoute,
              public ngProgress: NgProgress) { 

    router.events.subscribe((event) => {
      if(event instanceof NavigationEnd) {
        this.doGetParameters();
        this.ngProgress.start();
        this.doGetRepositories();
        this.ngProgress.done();
      }
    });        
  }

  ngOnInit() {
    this.doGetParameters();
    this.ngProgress.start();
    this.doGetRepositories();
    this.ngProgress.done();
  }

  doGetParameters() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.q = params['q'];
      this.stars = + params['stars'];
      this.license = params['license'];
      if(params['fork']) {
        this.fork = params['fork'];
      } else {
        this.fork = false;
      }
    });
  }

  doGetRepositories() {
    this.githubApiService.getRepositories(this.q, this.stars, this.license, this.fork)
                         .subscribe(repositories => {
                           this.repositories = repositories;
                         });                  
  }

}
