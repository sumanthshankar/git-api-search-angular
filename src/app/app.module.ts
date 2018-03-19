import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgProgressModule } from 'ngx-progressbar';


import { AppRoutingModule } from './app-routing.module';

import { GitHubApiService } from './githubapi.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SearchResultComponent } from './searchresult/searchresult.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SearchResultComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgProgressModule
  ],
  providers: [GitHubApiService],
  bootstrap: [AppComponent]
})

export class AppModule { }
