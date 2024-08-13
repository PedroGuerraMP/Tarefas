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
    this.baseUrl = 'http://localhost:3000/tarefas';
  }

  getAll(): Observable<Tarefa[]> {
    let tarefas: Tarefa[];
    // return this.http.get<Tarefa[]>(baseUrl);
    return of(mock_tarefa_list);
  }

  get(id: number): Observable<Tarefa> {
    return this.http.get<Tarefa>(`${this.baseUrl}/${id}`);
  }

}
