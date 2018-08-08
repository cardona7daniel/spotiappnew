import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private spotify: SpotifyService) {
    spotify.getNewReleases();
  }

  ngOnInit() {
  }

}

// this.http.get("https://restcountries.eu/rest/v2/lang/es")
//       .subscribe((data: any) => {
//         this.paises = data;
//       });
