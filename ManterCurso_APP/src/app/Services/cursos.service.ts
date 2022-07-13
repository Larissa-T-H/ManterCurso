import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from '../Models/Curso';

const httpOptions ={ headers: new HttpHeaders({
  'content-type': 'application/json' })}

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  urlApiCurso = 'https://localhost:44319/api/Cursos';

  constructor(private http: HttpClient) { }

  ListarCursos() : Observable<Curso[]>
  {
    return this.http.get<Curso[]>(this.urlApiCurso);
  }

  PegarCursoId(cursoId:number) : Observable<Curso>
  {
    const url = `${this.urlApiCurso}/${cursoId}`;
    return this.http.get<Curso>(url);
  }

  AdicionarCurso(curso:Curso) : Observable<Curso>
  {
      return this.http.post<Curso>(this.urlApiCurso, curso, httpOptions);
  }

  AtualizarCurso(curso:Curso): Observable<Curso>
  {
    const url = `${this.urlApiCurso}/${curso.cursoId}`;
    return this.http.put<Curso>(url, curso, httpOptions);
  }

  ExcluirCurso(cursoId: number): Observable<Curso>
  {
    const url = `${this.urlApiCurso}/${cursoId}`;
    return this.http.delete<Curso>(url, httpOptions);
  }
}
