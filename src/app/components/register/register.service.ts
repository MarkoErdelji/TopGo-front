import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface RegisterData{
  name :String;
  surname:String;
  profilePicture:String;
  telephoneNumber:String;
  email:String;
  address:String;
  password:String;

}

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) { }

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  
  async register(regData:RegisterData){
    const res = await this.http
      .post<any>(`http://localhost:8000/api/passenger`, JSON.stringify(regData),{'headers':headers})
      .subscribe((res: any) => {
        console.log(res);
      });

  }
}
