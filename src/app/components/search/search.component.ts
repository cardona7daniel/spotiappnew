import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  private _timeout: any = null;
  private artistas: any[] = [];
  private cargando: boolean = false;
  constructor(private spotify: SpotifyService) { }

  buscar(termino: string) {
    this.cargando = true;
    clearTimeout(this._timeout);
    this._timeout = setTimeout(() => {
      this.spotify.getArtist(termino).subscribe(
        (data: any) => {
          this.artistas = data;
          this.cargando = false;
        }
      );
    }, 500)
  }

}
