// src/app/movie-card/movie-card.component.ts
import { Component, Input, OnInit } from '@angular/core';
import {
  AddToFavorites,
  DeleteFromFavorites,
  GetAllMoviesService,
} from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { SynopsisComponent } from '../synopsis/synopsis.component';
import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserDataService } from '../services/user-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  user: any;
  currentRoute: string = '';

  @Input() movies: any[] = [];
  constructor(
    public getAllMoviesService: GetAllMoviesService,
    public addToFavorites: AddToFavorites,
    public deleteFromFavorites: DeleteFromFavorites,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private userDataService: UserDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe((url) => {
      this.currentRoute = url[0].path;
    });

    if (!this.movies || this.movies.length === 0) {
      this.getMovies();
    }
    this.userDataService.getUser().subscribe((user) => {
      this.user = user;
      this.updateFavoriteStatus();
    });
  }

  getMovies(): void {
    this.getAllMoviesService.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      this.updateFavoriteStatus();
      return this.movies;
    });
  }

  updateFavoriteStatus(): void {
    if (this.user && this.movies) {
      this.movies.forEach((movie) => {
        movie.isFavorited = this.user.Favorites.includes(movie._id);
      });
    }
  }

  openSynopsisDialog(movie: any): void {
    this.dialog.open(SynopsisComponent, {
      width: '280px',
      data: { movie: movie },
    });
  }

  openDirectorDialog(movie: any): void {
    this.dialog.open(DirectorComponent, {
      width: '280px',
      data: { movie: movie },
    });
  }

  openGenreDialog(movie: any): void {
    this.dialog.open(GenreComponent, {
      width: '280px',
      data: { movie: movie },
    });
  }

  favoriteMovie(movie: any): void {
    const username = this.user ? this.user.Username : null;
    const movieID = movie._id;

    if (this.user.Favorites.includes(movieID)) {
      this.deleteFromFavorites.deleteFavorite(username, movieID).subscribe(
        (response) => {
          console.log('Movie removed from favorites:', response);
          this.snackBar.open('Movie removed from favorites', 'OK', {
            duration: 2000,
          });
          // Update the user's favorites in UserDataService
          const index = this.user.Favorites.indexOf(movieID);
          if (index > -1) {
            this.user.Favorites.splice(index, 1); // Remove the movie from favorites
          }
          this.userDataService.updateUser(this.user);
          movie.isFavorited = false; // Update local state
        },
        (error) => {
          console.error('Error removing movie from favorites:', error);
          this.snackBar.open('Failed to remove movie from favorites', 'OK', {
            duration: 2000,
          });
        }
      );
    } else {
      this.addToFavorites.addFavorite(username, movieID).subscribe(
        (response) => {
          console.log('API Response:', response);
          this.snackBar.open('Movie added to favorites', 'OK', {
            duration: 2000,
          });
          // Update the user's favorites in UserDataService
          this.user.Favorites.push(movieID);
          this.userDataService.updateUser(this.user);
          movie.isFavorited = true;
        },
        (error) => {
          // Handle error response
          console.error('Error adding movie to favorites:', error);
          this.snackBar.open('Failed to add movie to favorites', 'OK', {
            duration: 2000,
          });
        }
      );
    }
  }

  scrollLeft(): void {
    const container = document.querySelector(
      '.movies-scrollable'
    ) as HTMLElement;
    if (container) {
      container.scrollBy({ left: -200, behavior: 'smooth' });
    }
  }

  scrollRight(): void {
    const container = document.querySelector(
      '.movies-scrollable'
    ) as HTMLElement;
    if (container) {
      container.scrollBy({ left: 200, behavior: 'smooth' });
    }
  }
}
