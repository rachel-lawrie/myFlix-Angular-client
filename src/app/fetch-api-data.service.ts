/**
 * Service classes for interacting with the myflix API.
 * Includes services for user registration, login, movie information retrieval, and user profile management.
 */
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
/**
 * Base service class providing common functionalities to other services.
 * Includes error handling for HTTP requests.
 */
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

/**
 * Service for handling user registration.
 * Extends BaseService to utilize common functionalities.
 */
@Injectable({
  providedIn: 'root',
})
export class UserRegistrationService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }
  /**
   * Registers a new user with the provided details.
   * @param userDetails - Object containing the new user's registration details.
   * @returns Observable from the HTTP POST request.
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }
}

/**
 * Service for handling user login.
 * Extends BaseService to utilize common functionalities.
 */
@Injectable({
  providedIn: 'root',
})
export class UserLoginService extends BaseService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(http: HttpClient) {
    super(http);
  }
  /**
   * Logs in a user with the provided details.
   * @param userDetails - Object containing the user's login credentials.
   * @returns Observable from the HTTP POST request.
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }
}

/**
 * Service for retrieving all movies from the API.
 * Extends BaseService to utilize common functionalities.
 */
@Injectable({
  providedIn: 'root',
})
export class GetAllMoviesService extends BaseService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(http: HttpClient) {
    super(http);
  }
  /**
   * Retrieves a list of all movies.
   * Requires a valid JWT token for authorization.
   * @returns Observable from the HTTP GET request.
   */
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

/**
 * Service for retrieving details of a specific movie.
 * Extends BaseService to utilize common functionalities.
 */
@Injectable({
  providedIn: 'root',
})
export class GetMovieService extends BaseService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(http: HttpClient) {
    super(http);
  }
  /**
   * Retrieves details for a specific movie by title.
   * @param movieTitle - Title of the movie to retrieve.
   * @returns Observable from the HTTP GET request.
   */
  getMovie(movieTitle: string): Observable<any> {
    return this.http
      .get(apiUrl + 'movies/' + movieTitle)
      .pipe(catchError(this.handleError));
  }
}

/**
 * Service for retrieving information about a specific director.
 * Extends BaseService to utilize common functionalities.
 */
@Injectable({
  providedIn: 'root',
})
export class GetDirectorService extends BaseService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(http: HttpClient) {
    super(http);
  }
  /**
   * Retrieves details for a specific director by name.
   * @param directorName - Name of the director to retrieve.
   * @returns Observable from the HTTP GET request.
   */
  getDirector(directorName: string): Observable<any> {
    return this.http
      .get(apiUrl + 'directors/' + directorName)
      .pipe(catchError(this.handleError));
  }
}

/**
 * Service for retrieving information about a specific movie genre.
 * Extends BaseService to utilize common functionalities.
 */
@Injectable({
  providedIn: 'root',
})
export class GetGenreInfoService extends BaseService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(http: HttpClient) {
    super(http);
  }
  /**
   * Retrieves details for a specific genre by name.
   * @param genreName - Name of the genre to retrieve.
   * @returns Observable from the HTTP GET request.
   */
  getGenre(genreName: string): Observable<any> {
    return this.http
      .get(apiUrl + 'genres/' + genreName)
      .pipe(catchError(this.handleError));
  }
}

/**
 * Service for retrieving details of an individual user.
 * Extends BaseService to utilize common functionalities.
 */
@Injectable({
  providedIn: 'root',
})
export class GetIndvUserService extends BaseService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(http: HttpClient) {
    super(http);
  }
  /**
   * Retrieves details for a specific user by username.
   * @param userName - Username of the user to retrieve.
   * @returns Observable from the HTTP GET request.
   */
  getUser(userName: string): Observable<any> {
    return this.http
      .get(apiUrl + 'users/' + userName)
      .pipe(catchError(this.handleError));
  }
}

/**
 * Service for retrieving a user's favorite movies.
 * Extends BaseService to utilize common functionalities.
 */
@Injectable({
  providedIn: 'root',
})
export class GetUserFavorites extends BaseService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(http: HttpClient) {
    super(http);
  }
  /**
   * Retrieves a list of favorite movies for a specific user.
   * @param userName - Username of the user whose favorites are to be retrieved.
   * @returns Observable from the HTTP GET request.
   */
  getUserFavorites(userName: string): Observable<any> {
    return this.http
      .get(apiUrl + 'users/' + userName + '/movies')
      .pipe(catchError(this.handleError));
  }
}

/**
 * Service for adding a movie to a user's list of favorites.
 * Extends BaseService to utilize common functionalities, particularly for handling HTTP requests.
 */
@Injectable({
  providedIn: 'root',
})
export class AddToFavorites extends BaseService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(http: HttpClient) {
    super(http);
  }
  /**
   * Adds a specified movie to a user's favorite list.
   * Requires authentication via JWT token stored in local storage.
   * @param username - The username of the user.
   * @param movieID - The ID of the movie to be added to favorites.
   * @returns Observable from the HTTP POST request.
   */
  public addFavorite(username: string, movieID: string): Observable<any> {
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
      .post(apiUrl + 'users/' + username + '/movies/' + movieID, { headers })
      .pipe(catchError(this.handleError));
  }
}

/**
 * Service for editing user details.
 * Inherits common HTTP functionalities from BaseService.
 */
@Injectable({
  providedIn: 'root',
})
export class EditUserService extends BaseService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(http: HttpClient) {
    super(http);
  }
  /**
   * Edits details of an existing user.
   * Requires a valid JWT token for authentication.
   * @param username - Username of the user to be edited.
   * @param userDetails - Object containing the updated user details.
   * @returns Observable from the HTTP PUT request.
   */
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

/**
 * Service for deleting a user.
 * Inherits common functionalities from BaseService, especially for HTTP operations.
 */
@Injectable({
  providedIn: 'root',
})
/**
 * Deletes a user from the system.
 * @param userName - The username of the user to be deleted.
 * @returns Observable from the HTTP DELETE request.
 */
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

/**
 * Service for removing a movie from a user's list of favorites.
 * Utilizes BaseService for common HTTP request handling.
 */
@Injectable({
  providedIn: 'root',
})
/**
 * Removes a specified movie from a user's favorites.
 * @param username - The username of the user.
 * @param movieID - The ID of the movie to be removed from favorites.
 * @returns Observable from the HTTP DELETE request.
 */
export class DeleteFromFavorites extends BaseService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(http: HttpClient) {
    super(http);
  }
  public deleteFavorite(username: string, movieID: string): Observable<any> {
    return this.http
      .delete(apiUrl + 'users/' + username + '/movies/' + movieID, {})
      .pipe(catchError(this.handleError));
  }
}
