import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Tarefa } from '../models/tarefa.model';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {
  
  private baseUrl: string;

  constructor(private http: HttpClient) { 
    this.baseUrl = 'http://localhost:5111/tarefa';
  }

  getAll(): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(this.baseUrl);
  }

  get(id: number): Observable<Tarefa> {
    return this.http.get<Tarefa>(`${this.baseUrl}/${id}`);
  }

  post(tarefa:Tarefa): Observable<Tarefa> {
    return this.http.post<Tarefa>(`${this.baseUrl}`, tarefa);
  }

  put(tarefa:Tarefa): Observable<Tarefa> {
    return this.http.put<Tarefa>(`${this.baseUrl}`, tarefa);
  }

  delete(id:number): Observable<Tarefa> {
    return this.http.delete<Tarefa>(`${this.baseUrl}/${id}`);
  }
}
