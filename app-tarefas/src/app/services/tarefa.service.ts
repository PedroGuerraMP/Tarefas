import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Tarefa } from '../models/tarefa.model';
import { mock_tarefa_list } from '../mocks/tarefa.mock';

const baseUrl = 'http://localhost:3000/tarefas';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Tarefa[]> {
    // return this.http.get<Tarefa[]>(baseUrl);
    return new Observable<Tarefa[]>(observer => {
      setInterval(() => observer.next(mock_tarefa_list), 100);
    });
  }

  get(id: number): Observable<Tarefa> {
    return this.http.get<Tarefa>(`${baseUrl}/${id}`);
  }

}
