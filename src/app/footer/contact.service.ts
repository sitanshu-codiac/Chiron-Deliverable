import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '../footer/contact.model';

@Injectable({providedIn: 'root'})
export class ContactService {
  constructor(private http: HttpClient) {}

  contactMessage(contactEmail: string, contactSubject: string, contactMesage: string) {
    const message: Message = { email: contactEmail, subject: contactSubject, message: contactMesage };
    this.http.post<{message: string, result: JSON}>('http://localhost:3000/api/contact', message)
      .subscribe(response => {
      });
  }

}
