import { Component, OnInit } from '@angular/core';
import { GetAllMoviesService } from '../fetch-api-data.service';
import { UserDataService } from '../services/user-data.service';

/**
 * FavoritesComponent represents the user favorites view in the application.
 * It provides functionalities for displaying and editing user favorites.
 */
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  user: any;
  allMovies: any[] = [];
  favoriteMovies: any[] = [];

  constructor(
    private getAllMoviesService: GetAllMoviesService,
    private userDataService: UserDataService
  ) {}

  ngOnInit(): void {
    this.userDataService.getUser().subscribe((user) => {
      this.user = user;
      this.filterFavoriteMovies(); // Call this to filter after getting user data
    });

    this.getAllMoviesService.getAllMovies().subscribe((movies) => {
      this.allMovies = movies;
      this.filterFavoriteMovies(); // Call this to filter after getting all movies
    });
  }

  filterFavoriteMovies(): void {
    if (this.user && this.allMovies) {
      this.favoriteMovies = this.allMovies.filter((movie) =>
        this.user.Favorites.includes(movie._id)
      );
      console.log('Filtered favorite movies:', this.favoriteMovies);
    }
  }
}
