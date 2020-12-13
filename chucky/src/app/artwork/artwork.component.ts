import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Artwork } from '../model/artwork';
import { ArtworkService } from '../shared/artwork.service';
import { flyInOut, expand } from '../animations/app.animation';
import { FilterPipe } from '../filter/filter.pipe';

@Component({
  selector: 'app-artwork',
  templateUrl: './artwork.component.html',
  styleUrls: ['./artwork.component.css'],
  animations: [
    expand()
  ]
})
export class ArtworkComponent implements OnInit {

  @Output() notifLike = new EventEmitter<Artwork>();	
  @Input() artworks: Artwork[];
  errMess: string;
  baseURL = 'http://localhost:3000';
  constructor(private artworkService: ArtworkService) { }

  ngOnInit(): void {
  	// this.artworkService.getArtworks()
   //  .subscribe(artworks => this.artworks = artworks,
   //    errmess => this.errMess = <any>errmess);
  }

  sendNotif(comm){
    this.notifLike.emit(comm);
  }
  updateViews(comm){
  	comm.views= comm.views+1;
  	this.artworkService.updateArtwork(comm)
      .subscribe(artwork => console.log(comm) , errmess => { this.errMess = <any>errmess; });
  }

}
