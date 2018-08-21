import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private nuevasCanciones: any[] = [];
  private cargando: boolean = false;
  constructor(private spotify: SpotifyService) {
    this.getNewReleases();
  }

  getNewReleases(): void {
    this.cargando = true;
    this.spotify.getNewReleases().subscribe(
      (data: any) => {
        this.nuevasCanciones = data;
        this.cargando = false;
      }
    );
  }

  ngOnInit() {
    
  }

}

// this.http.get("https://restcountries.eu/rest/v2/lang/es")
//       .subscribe((data: any) => {
//         this.paises = data;
//       });
