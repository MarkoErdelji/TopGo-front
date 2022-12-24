import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }

  private base64Subject = new BehaviorSubject<string>('initial value');
  base64Observable$ = this.base64Subject.asObservable();

  setImageUrl(url: string) {
    this.base64Subject.next(url);
  }

  getImageUrl() {
    return this.base64Subject.asObservable();
  }
}
