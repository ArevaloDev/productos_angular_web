export interface LoginRequest {
  email:string;
  password:string;
}

export interface LoginResponse {
  estado:string;
  nombre:String;
  correo:string;
  token:string;
}

export interface PostLogin{
  correo:string;
  password:string;
}
