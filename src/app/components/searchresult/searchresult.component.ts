import { Component, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params, Event, NavigationEnd, NavigationStart } from '@angular/router';
import { NgProgress } from 'ngx-progressbar';
import { Subscription } from 'rxjs/Subscription';

import { GitHubApiService } from '../../services/githubapi.service';
import { Repository } from '../../models/repository';

@Component({
  selector: 'searchresult-component',
  templateUrl: './searchresult.component.html',
  styleUrls: ['./searchresult.component.css']
})

export class SearchResultComponent implements OnDestroy {

  private githubApiServiceSubscription: Subscription;
  private parametersSubscription: Subscription;
  private repositories: Repository[] = null;
  private q: string;
  private stars: number;
  private license: string;
  private fork: boolean;
  private errorMessage: string = null;

  constructor(private githubApiService: GitHubApiService, 
              private router: Router, 
              private activatedRoute: ActivatedRoute,
              private ngProgress: NgProgress) { 

    router.events.subscribe((event) => {
      if(event instanceof NavigationStart) {
        this.ngProgress.start();
      }
      if(event instanceof NavigationEnd) {
        this.doGetParameters();
        this.doGetRepositories();
        this.ngProgress.done();
      }
    });        
  }

  doGetParameters() {
    this.parametersSubscription = 
    this.activatedRoute.queryParams
                       .subscribe((params: Params) => {
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
    this.githubApiServiceSubscription = 
    this.githubApiService.getRepositories(this.q, this.stars, this.license, this.fork)
                         .subscribe((repositories) => this.repositories = repositories,
                                    (error) => this.errorMessage = error);                  
  }

  ngOnDestroy() {
    this.githubApiServiceSubscription.unsubscribe();
    this.parametersSubscription.unsubscribe();
  }

}
