import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../Models/Categoria';

const httpOptions ={ headers: new HttpHeaders({
  'content-type': 'application/json' })}
  
@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  urlApi = 'https://localhost:44319/api/Categorias'

  constructor(private http: HttpClient) { }

  ListarCategoria(): Observable<Categoria[]>
  {
    return this.http.get<Categoria[]>(this.urlApi, httpOptions);
  }
}
