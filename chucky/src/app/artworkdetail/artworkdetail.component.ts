import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Artwork } from '../model/artwork';
import { ArtworkService } from '../shared/artwork.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-artworkdetail',
  templateUrl: './artworkdetail.component.html',
  styleUrls: ['./artworkdetail.component.css']
})
export class ArtworkdetailComponent implements OnInit {


  errMess: string;
  artwork: Artwork;
  artworkIds: string[];
  baseURL = 'http://localhost:3000';
  
  constructor(private artworkservice: ArtworkService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.artworkservice.getArtworkIds().subscribe(artworkIds => this.artworkIds = artworkIds);
    this.route.params.pipe(switchMap((params: Params) => { return this.artworkservice.getArtwork(+params['id']); }))
    .subscribe(artwork => { this.artwork = artwork; },
      errmess => this.errMess = <any>errmess);
  }

}
