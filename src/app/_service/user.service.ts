import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';
import { UserListDTO } from '../modules/DTO/UserListDTO';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }


  getUserByEmail(email:string){
    return this.http
      .get<any>(`http://localhost:8000/api/user/`+email,{

        observe: 'response',
        responseType: 'json'
      })
        
  }

  blockUser(userId){
    return this.http
      .put<any>(`http://localhost:8000/api/user/`+userId+"/block",{

        observe: 'response',
        responseType: 'json'
      })
  }

  unblockUser(userId){
    return this.http
      .put<any>(`http://localhost:8000/api/user/`+userId+"/unblock",{

        observe: 'response',
        responseType: 'json'
      })
  }

  getUsers(page,size){
    return this.http.get<UserListDTO>('http://localhost:8000/api/user', { params: { page: page, size: size },   observe: 'response',
    responseType: 'json' },)
  }
}
