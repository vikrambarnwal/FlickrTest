import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError,tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class ImageService {
  public url:any
  config = {
    headers: {'Content-Type': 'application/json'}
};

  constructor(private http: HttpClient,) { }

  private static handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      if (error.status >= 500) {
        throw error;
      }

      return of(result as T);
    };
  }

  getImages(pageNo:number): Observable<any> {
    this.url='https://api.flickr.com/services/rest?sort=relevance&parse_tags=1&content_type=7&extras=media%2Cneeds_interstitial%2Curl_c%2Curl_l%2Curl_m%2Cis_marketplace_licensable&per_page=30&page='+pageNo+ '&lang=en-US&text=food&viewerNSID=&method=flickr.photos.search&csrf=&api_key=2477fc2faa87d31bb3ac9d9929ab6376&format=json&hermes=1&hermesClient=1&reqId=f866abd5&nojsoncallback=1';
    return this.http.get<any>(this.url )
      .pipe(
        tap(() => console.log(`fetched images`)),
        catchError(ImageService.handleError('getImages', []))
      );
  }

  getImageById(id: string): Observable<any> {
    this.url ='http://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=2477fc2faa87d31bb3ac9d9929ab6376&photo_id='+id+'&format=json&nojsoncallback=1";';
    return this.http.get<any>(this.url).pipe(
      tap(() => console.log(`fetched Image id=${id}`)),
      catchError(ImageService.handleError<any>(`getImageById id=${id}`))
    );
  }

}
