import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';
import { apiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-literary-work',
  templateUrl: './literary-work.component.html',
  styleUrls: ['./literary-work.component.scss']
})
export class LiteraryWorkComponent implements OnInit {
  loggedInUser: string | null = '';
  userType: string | null = '';
  authorName: string = '';
  titles: string[] = [];
  favorite: Set<string> = new Set();

  constructor(private route: ActivatedRoute, private apiservice: apiService) { }

  ngOnInit(): void {
    this.authorName = decodeURIComponent(this.route.snapshot.paramMap.get('name') || '');
    this.loggedInUser = localStorage.getItem('loggedInUser');
    this.userType = localStorage.getItem('userType');
    this.apiservice.getAuthor(this.authorName).subscribe((data) => {
      this.titles = data.map((work: any) => work.title);
      console.log(this.titles);
    });

    this.loadFavoriteTitles();
  }

  addToFavorite(title: string) {
    if (this.userType === 'registered') {
      if (this.favorite.has(title)) {
        this.favorite.delete(title);
      } else {
        this.favorite.add(title);
      }
      this.saveFavoriteTitles();
    } else {
      alert('Solo los usuarios registrados pueden añadir títulos a favoritos.');
    }
  }

  isFavorite(title: string): boolean {
    return this.favorite.has(title);
  }

  loadFavoriteTitles() {
    const favorites = JSON.parse(localStorage.getItem('favoriteTitles') || '[]');
    this.favorite = new Set(favorites);
  }

  saveFavoriteTitles() {
    const favoriteArray = Array.from(this.favorite);
    localStorage.setItem('favoriteTitles', JSON.stringify(favoriteArray));
  }

}
