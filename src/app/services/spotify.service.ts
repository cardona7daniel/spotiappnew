import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams,HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  private token: string = 'Bearer BQBHSL7MpDxf2Z5k4pL7WNu3rfRxph_2-n0xGg8y95_Lv1IYpiNH3T4rz-9ayzt2WQHyAGNLFdSE4TAStGI'

  constructor(private http: HttpClient) {
  }

  private getToken(): Promise<any> {
    const body = new HttpParams()
    .set('grant_type', 'client_credentials')
    .set('client_id', 'd8f15cfebc3b465fb51e2a3b22f706c2') //TODO Tomar el clienId de la api de spotify
    .set('client_secret', '5d06a4fe54f5410babd782f671bcc0c1'); //TODO Tomar el clientSecret de la api de spotify
  const headers: HttpHeaders = new HttpHeaders()
      .set('Content-Type',  'application/x-www-form-urlencoded');
    return new Promise((resolve, reject) => {
      this.http.post('https://accounts.spotify.com/api/token', body, { headers })
        .subscribe(
          (token: any) => {
            const tokenId: string = `${token.token_type} ${token.access_token}`;
            sessionStorage.setItem("tokenId", `${token.token_type} ${token.access_token}`);
            resolve(tokenId);
        }, (error: any) => {
          reject(error);
        });
    });
  }

  getHeaders():HttpHeaders {
    return new HttpHeaders()
      .set('authorization', this.token);
  }

  getQuery(query: string) {
    const url: string = `https://api.spotify.com/v1/${query}`;
    const headers = this.getHeaders();
    return this.http.get(url, { headers })

  }

  getNewReleases(): Observable<any> {
    return this.getQuery('browse/new-releases?limit=10')
      .pipe(map((data: any) => data.albums.items));
  }

  getArtist(termino: string) {
    return this.getQuery(`search?query=${termino}&type=artist&market=US&offset=5&limit=10`)
      .pipe(map((data: any) => data.artists.items));
  }

  // getNewReleases2(): Observable<any> {
  //   const tokenId: string = sessionStorage.getItem("tokenId");
  //   const urlReleases = 'https://api.spotify.com/v1/browse/new-releases';
  //   let headers: HttpHeaders;
  //   if (!tokenId) {
  //     this.getToken()
  //       .then((token: string) => {
  //         headers = this.getHeaders(token);
  //       })
  //       .catch((error: any) => {
  //         console.log(error);
  //       })
  //   }
  //   return this.http.get(urlReleases, { headers });
  // }
}
