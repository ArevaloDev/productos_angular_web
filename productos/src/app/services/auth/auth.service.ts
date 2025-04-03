import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { RegisterRequest } from '../../interfaces/register.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api:string = environment.apiUrl;
  constructor(private http:HttpClient) { }

  register = (register:RegisterRequest) => {
    return this.http.post<RegisterRequest>(`${this.api}/registro`, register).subscribe(response => {
      console.log(response);

    })
  }
}
