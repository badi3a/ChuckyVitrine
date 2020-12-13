import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { flyInOut, expand } from '../animations/app.animation';
import { Contactmsg } from '../model/contactmsg';
import { ContactmsgService } from '../shared/contactmsg.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  errMess: string;  contactmsg: Contactmsg;
  cmsg: Contactmsg;
  contactmsgs : Contactmsg[];
  bol=true;
  lob=true;
  baseURL = 'http://localhost:3000';
  d = new Date();
  n = this.d.toISOString();
  contactForm: FormGroup;

  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  validationMessages = {
    'firstname': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required':      'Tel. number is required.',
      'pattern':       'Tel. number must contain only numbers.'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },
  };	

  constructor(private contactmsgService: ContactmsgService,
    private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
  	this.contactmsgService.getContactmsgs()
    .subscribe(contactmsgs => { this.contactmsgs = contactmsgs; },
      errmess => this.errMess = <any>errmess);
    console.log(this.contactmsgs);
  }

  createForm() {
    this.contactForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      telnum: ['', [Validators.required, Validators.pattern] ],
      email: ['', [Validators.required, Validators.email] ],
      message: ''
    });
    this.contactForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.contactForm) { return; }
    const form = this.contactForm;
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

	onSubmit() {
    this.bol=false;
    this.lob=false;
    this.contactmsg = this.contactForm.value;
    console.log(this.contactmsg);
    this.contactmsgService.addComment(this.contactmsg)
      .subscribe(contactmsg => { this.contactmsgs.push(this.contactmsg); this.bol=true; this.cmsg=this.contactmsg; setTimeout(() => {  this.lob=true; }, 5000); },
      errmess => { this.contactmsg = null; this.errMess = <any>errmess; });


      
    this.contactForm.reset({
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      message: ''
    });
  }

}
