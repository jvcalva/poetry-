import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { apiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {
  favoriteAuthors: string[] = [];
  favoriteTitles: string[] = [];
  authorName: string = '';
  favoriteAuthorSet: Set<string> = new Set();
  favoriteTitleSet: Set<string> = new Set();

  constructor(private route: ActivatedRoute, private apiservice: apiService) { }

  ngOnInit(): void {
    this.authorName = decodeURIComponent(this.route.snapshot.paramMap.get('name') || '');
    console.log('Author Name:', this.authorName); 

    if (this.authorName) {
        this.apiservice.getAuthor(this.authorName).subscribe((data) => {
            if (Array.isArray(data)) {
                this.favoriteTitles = data.map((work: any) => work.title);
                console.log(this.favoriteTitles);
            }
        }, error => {
            console.error('Error fetching author data:', error);
        });
    } else {
        console.error('No author name provided');
    }

    this.loadFavoriteAuthors();
    this.loadFavoriteTitles();
}


  loadFavoriteAuthors() {
    const favorites = JSON.parse(localStorage.getItem('favoriteAuthor') || '[]');
    this.favoriteAuthors = favorites;
    this.favoriteAuthorSet = new Set(favorites);
  }

  loadFavoriteTitles() {
    const favorites = JSON.parse(localStorage.getItem('favoriteTitles') || '[]');
    this.favoriteTitles = favorites; 
    this.favoriteTitleSet = new Set(favorites); 
  }
  

  removeFromFavorites(author: string) {
    this.favoriteAuthors = this.favoriteAuthors.filter(a => a !== author);
    this.favoriteAuthorSet.delete(author);
    localStorage.setItem('favoriteAuthor', JSON.stringify(this.favoriteAuthors));
  }
  removeTitleFromFavorites(title: string) {
    this.favoriteTitles = this.favoriteTitles.filter(t => t !== title);
    this.favoriteTitleSet.delete(title);
    localStorage.setItem('favoriteTitles', JSON.stringify(this.favoriteTitles));
  }
}
