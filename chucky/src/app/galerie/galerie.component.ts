import { Component, OnInit } from '@angular/core';
import { Artwork } from '../model/artwork';
import { ArtworkService } from '../shared/artwork.service';
import { Comment } from '../model/comment';
import { CommentService } from '../shared/comment.service';
import { switchMap } from 'rxjs/operators';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-galerie',
  templateUrl: './galerie.component.html',
  host: {
  '[@flyInOut]': 'true',
  'style': 'display: block;'
  },
  styleUrls: ['./galerie.component.css'],
  animations: [
    flyInOut(),
    expand()
  ]
})

export class GalerieComponent implements OnInit {

  errMess: string;
  sech: string;
  artworks: Artwork[];
  sortart: Artwork[];
  searchart: Artwork[] = new Array();
  resetartworks: Artwork[];
  commentes: Comment[];
  comm: Comment;
  comment: Comment;
  bol=false;
  srch=false;
  baseURL = 'http://localhost:3000';
  val1='Ajouter';
  val2='Your comment';
  auth= 'Author';
  cont= 'Your comment';
  bole=false;
  bl=true;
  d = new Date();
  n = this.d.toISOString();
  commentForm: FormGroup;

  formErrors = {
    id: '',
    author: '',
      content: '',
      date: ''
  };

  validationMessages = {
    'author': {
      'required':      'Author is required.',
    },
    'content': {
      'required':      'Comment is required.',
    },
  };

  constructor(private artworkService: ArtworkService,
   private commentService: CommentService,
   private fb: FormBuilder) {
   this.createForm(); }
  
  ngOnInit(): void {
  this.artworkService.getArtworks()
    .subscribe(artworks => { this.artworks = artworks; this.resetartworks=artworks; this.bol=true; },
      errmess => this.errMess = <any>errmess);
    
  this.commentService.getComments()
    .subscribe(comments => this.commentes = comments,
      errmess => this.errMess = <any>errmess);
    this.comment= new Comment();
  }

  resetArt(){
  	this.artworks=this.resetartworks;
  }

  createForm() {
    this.commentForm = this.fb.group({
      author: ['', [Validators.required]],
      content: ['', [Validators.required]],
      date: ''
    });
    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
    }

    onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onDelete(comm): void{
  	console.log(comm);
  	this.commentService.deleteComment(comm)
  	.subscribe();
  	this.commentes = this.commentes.filter(comment => comment.id != comm.id);
  }

  onSrch(){
  	if(this.srch){
  		this.srch=false;
  	}
  	else
  		this.srch=true;
  }

  getComm(): void{
  	this.commentService.getComments()
    .subscribe(comments => { this.commentes = comments; this.bole=false; this.bl=true; },
      errmess => this.errMess = <any>errmess);
  }

  onSearch(rech){
  	this.searchart= new Array();
  	for(var a of this.artworks){
  		if ((a.title.search(rech) == -1) && (a.description.search(rech) == -1) ) { 
   console.log("Does not contain" ); 
} else { 
   this.searchart.push(a); 
}


  	}
  	console.log(this.searchart);
  	this.artworks=this.searchart;
  }

  sortLikes(){
  	this.artworks.sort((n1,n2)=> n2.likes-n1.likes);
  }
  sortViews(){
  	this.artworks.sort((n1,n2)=> n2.views-n1.views);
  }

//   onSubmit() {
	
// if (this.commentForm.valid) {
// 	if(this.val1==='Ajouter'){
// 		this.bole=true;
//   this.commentForm.value.date=this.n;
//     this.commentes.push(this.commentForm.value);
//     this.commentService.addComment(this.commentForm.value)
//       .subscribe(comment => { this.bole=false; 
//       },
//       errmess => { this.errMess = <any>errmess; });
      
//     this.commentForm.reset({
//               author: '',
//               content: '',
//               date: ''
//             });
//   }
//   else{
//   	this.bole=true;
//   	this.commentForm.value.date=this.n;
//   	this.commentForm.value.id=this.comm.id;
//     this.commentService.updateComment(this.commentForm.value)
//       .subscribe(comment => { this.getComm(); 
//       },
//       errmess => { this.errMess = <any>errmess; });
//       this.val1='Ajouter';
//   	this.val2='Your comment';
//   	this.auth= 'Author';
//   	this.cont= 'Your comment';
//     this.commentForm.reset({
//               author: '',
//               content: '',
//               date: ''
//             });

//   }
// }
// }

onSubmit() {
	
	if(this.val1==='Ajouter'){
  this.comment.date=this.n;
    this.commentes.push(this.comment);
    this.commentService.addComment(this.comment)
      .subscribe(comment => { 
      },
      errmess => { this.errMess = <any>errmess; });}
      else{
      	this.bl=false;
      	this.comment.date=this.n;
      	this.comment.id=this.comm.id;
      	this.commentService.updateComment(this.comment)
       .subscribe(comment => { this.getComm();  
       },
       errmess => { this.errMess = <any>errmess; });
       this.val1='Ajouter';
   	this.val2='Your comment';
   	this.auth= 'Author';
   	this.cont= 'Your comment';
      }
      
    
}

  onModify(modcomment) {
  	this.comm=modcomment;
  	this.val1='Modify';
  	this.val2='Modify comment';
  	this.auth= modcomment.author;
  	this.cont= modcomment.content;
  }

  incrementLike(art: Artwork){
    art.likes= art.likes+1;
    
    this.artworkService.updateArtwork(art)
      .subscribe(artwork => console.log(art) , errmess => { this.errMess = <any>errmess; });
  }

}
