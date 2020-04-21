import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public contactService: ContactService) { }

  ngOnInit() {
  }

  sendMessage(messageForm: NgForm) {
    if (messageForm.invalid) {
      return;
    }
    this.contactService.contactMessage(messageForm.value.contactEmail, messageForm.value.contactSubject, messageForm.value.contactMessage);
    messageForm.resetForm();
  }

}
