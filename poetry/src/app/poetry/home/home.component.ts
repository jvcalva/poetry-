import { Component, OnInit } from '@angular/core';
import { apiService } from 'src/app/services/api.service';
import { PoetryModule } from '../poetry.module';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loggedInUser: string | null = '';
  userType: string | null = '';
  authorName: string[] = [];
  favorite: Set<string> = new Set();

  constructor(private apiservice: apiService) { }

  ngOnInit(): void {
    this.authorsData();
    this.loggedInUser = localStorage.getItem('loggedInUser');
    this.userType = localStorage.getItem('userType');
    this.loadFavoriteAuthor();
  }

  authorsData() {
    this.apiservice.getData().subscribe(data => {
      this.authorName = data;
      console.log(this.authorName);
    });
  }

  addToFavorites(author: string) {
    if (this.userType === 'registered') {
      if (this.favorite.has(author)) {
        this.favorite.delete(author);
      } else {
        this.favorite.add(author);
      }
      this.saveFavoriteAuthor();
    }
  }

  isFavorite(author: string): boolean {
    return this.favorite.has(author);
  }

  loadFavoriteAuthor() {
    const favorites = JSON.parse(localStorage.getItem('favoriteAuthor') || '[]');
    this.favorite = new Set(favorites);
  }

  saveFavoriteAuthor() {
    const favoriteArray = Array.from(this.favorite);
    localStorage.setItem('favoriteAuthor', JSON.stringify(favoriteArray));
  }

}
