import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

import { Tarefa } from '../../models/tarefa.model';
import { TarefaService } from '../../services/tarefa.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tarefa-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, ],
  templateUrl: './tarefa-list.component.html',
  styleUrl: './tarefa-list.component.css'
})
export class TarefaListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'titulo', 'descricao'];
  dataSource: Tarefa[] = [];

  constructor(private tarefaService: TarefaService) {}

  ngOnInit(): void {
    console.log("ngOnInit");
    this.getTarefas();
  }

  getTarefas(): void {
    this.tarefaService.getAll().subscribe(tarefas => { 
      console.log(tarefas[0].id);
      this.dataSource = tarefas;
    });
  }



}
