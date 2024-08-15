import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Tarefa } from '../models/tarefa.model';
import { mock_tarefa_list } from '../mocks/tarefa.mock';


@Injectable({
  providedIn: 'root'
})
export class TarefaService {
  
  private baseUrl: string;

  constructor(private http: HttpClient) { 
    this.baseUrl = 'https://localhost:7027/tarefa';
  }

  getAll(): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(this.baseUrl);
  }

  get(id: number): Observable<Tarefa> {
    return this.http.get<Tarefa>(`${this.baseUrl}/${id}`);
  }

}
