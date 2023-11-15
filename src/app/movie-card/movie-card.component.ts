// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { AddToFavorites, GetAllMoviesService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { SynopsisComponent } from '../synopsis/synopsis.component';
import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserDataService } from '../services/user-data.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  user: any;

  movies: any[] = [];
  constructor(
    public getAllMoviesService: GetAllMoviesService,
    public addToFavorites: AddToFavorites,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private userDataService: UserDataService
  ) {}

  ngOnInit(): void {
    this.getMovies();
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
