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

  protected handleError(error: HttpErrorResponse): Observable<any> {
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

@Injectable({
  providedIn: 'root',
})
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

@Injectable({
  providedIn: 'root',
})
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
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }
}

@Injectable({
  providedIn: 'root',
})
export class GetAllMoviesService extends BaseService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(http: HttpClient) {
    super(http);
  }
  // Making the api call to get all movies
  getAllMovies(): Observable<any> {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token');

    // Check if the token exists in local storage
    if (!token) {
      // Handle the case where the token is missing or not available
      return throwError('Token is missing or not available');
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Use "Bearer" prefix for JWT token
    });

    // Add the headers to the HTTP options
    const options = { headers: headers };

    // Make the API call with the modified options
    return this.http
      .get(apiUrl + 'movies', options)
      .pipe(catchError(this.handleError));
  }
}

@Injectable({
  providedIn: 'root',
})
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

@Injectable({
  providedIn: 'root',
})
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

@Injectable({
  providedIn: 'root',
})
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

@Injectable({
  providedIn: 'root',
})
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

@Injectable({
  providedIn: 'root',
})
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

@Injectable({
  providedIn: 'root',
})
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

@Injectable({
  providedIn: 'root',
})
export class EditUserService extends BaseService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(http: HttpClient) {
    super(http);
  }
  // Making the api call for the user edit endpoint
  public editUser(username: string, userDetails: any): Observable<any> {
    // Get the JWT token from wherever it is stored in your application (e.g., local storage)
    const token = localStorage.getItem('token');

    if (!token) {
      // Handle the case where the token is missing or not available
      return throwError('Token is missing or not available');
    }

    // Set the Authorization header with the token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .put(apiUrl + 'users/' + username, userDetails, { headers })
      .pipe(catchError(this.handleError));
  }
}

@Injectable({
  providedIn: 'root',
})
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

@Injectable({
  providedIn: 'root',
})
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
