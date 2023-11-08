import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://lawrie-myflix.herokuapp.com/';
@Injectable({
  providedIn: 'root',
})
export class BaseService {
  constructor(protected http: HttpClient) {}

  protected handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}

export class UserRegistrationService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }
  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }
}

export class UserLoginService extends BaseService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(http: HttpClient) {
    super(http);
  }
  // Making the api call for the user login endpoint
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }
}

export class GetAllMoviesService extends BaseService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(http: HttpClient) {
    super(http);
  }
  // Making the api call to get all movies
  getAllMovies(): Observable<any> {
    return this.http.get(apiUrl + 'movies').pipe(catchError(this.handleError));
  }
}

export class GetMovieService extends BaseService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(http: HttpClient) {
    super(http);
  }
  // Making the api call to get all movies
  getMovie(movieTitle: string): Observable<any> {
    return this.http
      .get(apiUrl + 'movies/' + movieTitle)
      .pipe(catchError(this.handleError));
  }
}

export class GetDirectorService extends BaseService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(http: HttpClient) {
    super(http);
  }
  // Making the api call to get all movies
  getDirector(directorName: string): Observable<any> {
    return this.http
      .get(apiUrl + 'directors/' + directorName)
      .pipe(catchError(this.handleError));
  }
}

export class GetGenreInfoService extends BaseService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(http: HttpClient) {
    super(http);
  }
  // Making the api call to get all movies
  getGenre(genreName: string): Observable<any> {
    return this.http
      .get(apiUrl + 'genres/' + genreName)
      .pipe(catchError(this.handleError));
  }
}

export class GetIndvUserService extends BaseService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(http: HttpClient) {
    super(http);
  }
  // Making the api call to get all movies
  getUser(userName: string): Observable<any> {
    return this.http
      .get(apiUrl + 'users/' + userName)
      .pipe(catchError(this.handleError));
  }
}

export class GetUserFavorites extends BaseService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(http: HttpClient) {
    super(http);
  }
  getUserFavorites(userName: string): Observable<any> {
    return this.http
      .get(apiUrl + 'users/' + userName + '/movies')
      .pipe(catchError(this.handleError));
  }
}

export class AddToFavorites extends BaseService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(http: HttpClient) {
    super(http);
  }
  AddFavorite(userName: string, movieName: string): Observable<any> {
    return this.http
      .post(apiUrl + 'users/' + userName + '/movies/' + movieName, {})
      .pipe(catchError(this.handleError));
  }
}

export class EditUserService extends BaseService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(http: HttpClient) {
    super(http);
  }
  // Making the api call for the user registration endpoint
  public editUser(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .put(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }
}

export class DeleteUserService extends BaseService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(http: HttpClient) {
    super(http);
  }
  // Making the api call for the user registration endpoint
  public deleteUser(userName: any): Observable<any> {
    return this.http
      .delete(apiUrl + 'users/' + userName)
      .pipe(catchError(this.handleError));
  }
}

export class DeleteFromFavorites extends BaseService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(http: HttpClient) {
    super(http);
  }
  DeleteFavorite(userName: string, movieName: string): Observable<any> {
    return this.http
      .delete(apiUrl + 'users/' + userName + '/movies/' + movieName, {})
      .pipe(catchError(this.handleError));
  }
}
