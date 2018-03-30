import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { Repository } from '../../models/repository';


@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  private repositories: Repository[] = [];
  private searchForm: FormGroup;
  private imagePath: String;
  private numberPattern = "^[0-9>..=]+$";

  constructor(private router: Router) { }

  ngOnInit() {
    this.initilizeSearchForm();
  }

  initilizeSearchForm() {
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
