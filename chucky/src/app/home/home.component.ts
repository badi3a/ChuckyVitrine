import { Component, OnInit } from '@angular/core';
import { Artwork } from '../model/artwork';
import { ArtworkService } from '../shared/artwork.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  errMess: string;
  artworks: Artwork[];
  bol=false;
  baseURL = 'http://localhost:3000';

  constructor(private artworkService: ArtworkService) { }
  
  ngOnInit(): void {
  this.artworkService.getHomeArtworks()
    .subscribe(artworks => { this.artworks = artworks; this.bol=true; },
      errmess => this.errMess = <any>errmess);
  }

  incrementLike(art: Artwork){
    art.likes= art.likes+1;
    
    this.artworkService.updateArtwork(art)
      .subscribe(artwork => console.log(art) , errmess => { this.errMess = <any>errmess; });
  }

}
