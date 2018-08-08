import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { }

  getNewReleases() {

    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQAUiBt9ue8vyZ4yeWeW6YS4jKxoZlqvK4lwSvu71fCnYulXXMZUXSOUf5RXPpG6hTx_LdghDMhiuHyGfhQ'
    });

    this.http.get('https://api.spotify.com/v1/browse/new-releases', { headers })
    .subscribe(data => {
      console.log(data);
    });
  }
}
