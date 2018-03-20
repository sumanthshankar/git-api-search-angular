import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { GitHubApiService } from '../../services/githubapi.service';
import { Repository } from '../../models/repository';


@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  public repositories: Repository[] = [];

  searchForm: FormGroup;
  imagePath: String;
  numberPattern = "^[0-9>..=]+$";

  constructor(public githubApiService: GitHubApiService, public router: Router) { }

  ngOnInit() {
    this.searchForm = new FormGroup({
      'searchKeyword': new FormControl('', Validators.required),
      'stars': new FormControl('', [Validators.required, Validators.pattern(this.numberPattern)]),
      'license': new FormControl('', Validators.required),
      'fork': new FormControl('', )
    });
  }
  
  doGetList() {
    let fork;
    if(!this.searchForm.value.fork) {
      fork = false;
    } else {
      fork = true;
    }
    this.router.navigate(['search/repositories'], 
                         { queryParams: { 'q': this.searchForm.value.searchKeyword, 
                                          'stars': this.searchForm.value.stars, 
                                          'license': this.searchForm.value.license, 
                                          'fork': fork } });
    this.searchForm.reset();
  }

}
