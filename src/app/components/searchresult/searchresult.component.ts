import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, Event, NavigationEnd } from '@angular/router';
import { NgProgress } from 'ngx-progressbar';
import { Observable } from 'rxjs/Observable';

import { GitHubApiService } from '../../services/githubapi.service';
import { Repository } from '../../models/repository';

@Component({
  selector: 'searchresult-component',
  templateUrl: './searchresult.component.html',
  styleUrls: ['./searchresult.component.css']
})

export class SearchResultComponent implements OnInit {

  repositories: Repository[];
  q: string;
  stars: number;
  license: string;
  fork: boolean;

  constructor(private githubApiService: GitHubApiService, 
              private router: Router, 
              private activatedRoute: ActivatedRoute,
              private ngProgress: NgProgress) { 

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
                         .subscribe((repositories) => this.repositories = repositories,
                                    (error) => console.error(error));                  
  }

}
