import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MovieDataService} from './movie-data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'project';
  public rawData = [];
  public currentPage = 1;
  public totalPages = 1;
  public restItems;
  public movies = [];
  public searchData = '';
  public searchResult:boolean=true;;
  constructor(private http: HttpClient, private movieData: MovieDataService) {}
  ngOnInit( ) {

    this.movieData.get().subscribe(res => {
      this.rawData = res;
    });
    this.movies = this.rawData.slice(0, 10);
    if (this.rawData.length) {
      this.totalPages = this.rawData.length / 10;
    }
   }
public pagiantion(request) {
  if (request == "previous" ) {
      this.currentPage--;
      if(this.currentPage>0){
      let lastIndex = (this.currentPage * 10);
      let firstIndex =lastIndex - 10;
      this.movies = this.rawData.slice(firstIndex, lastIndex);
      }else{
        this.currentPage=1;
      }
  }else if(request == "next"){
    if (this.currentPage != this.totalPages) {
      this.currentPage++;
      let lastIndex = (this.currentPage * 10);
      let firstIndex = lastIndex - 10;
      this.movies = this.rawData.slice(firstIndex, lastIndex);
    }
  }
}


public searchMovie(event){
  if(event){
  let result=[];
  result = this.rawData.filter(obj=>obj.name===this.searchData);
  this.movies= [];
    if(result.length!=0){
      
      this.movies=result;
    }else{
      this.searchResult=false;
    }
  }
}
}

