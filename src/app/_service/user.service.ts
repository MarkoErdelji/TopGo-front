import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';
import { UserListBlockedDTO, UserListDTO, UserListResponseBlockedDTO, UserListResponseDTO } from '../modules/DTO/UserListDTO';
import { UserNoteListDTO } from '../modules/DTO/UserNoteListDTO';
import { UserRidesListDTO } from '../modules/DTO/UserRidesListDTO';

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

  getUserById(id:number){
    return this.http
      .get<UserListResponseDTO>(`http://localhost:8000/api/user/id/`+id,{

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
    return this.http.get<UserListBlockedDTO>('http://localhost:8000/api/user', { params: { page: page, size: size },   observe: 'response',
    responseType: 'json' },)
  }
  getUsersNotes(userId,page,size){
    return this.http.get<UserNoteListDTO>('http://localhost:8000/api/user/'+userId+"/note", { params: { page: page, size: size },   observe: 'response',
    responseType: 'json' },)
  }
  addUserNote(userId,dto){
    return this.http.post<UserListBlockedDTO>('http://localhost:8000/api/user/'+userId+"/note",dto,   {observe: 'response',
    responseType: 'json' },)
  }
  getUsersRides(userId,page,size,sort){
    return this.http.get<UserRidesListDTO>('http://localhost:8000/api/user/'+userId+"/ride", { params: { page: page, size: size,sort:sort },   observe: 'response',
    responseType: 'json' },)
  }
}
