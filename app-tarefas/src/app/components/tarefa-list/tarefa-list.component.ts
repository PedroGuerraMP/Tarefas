import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatExpansionModule} from '@angular/material/expansion';


import { Tarefa } from '../../models/tarefa.model';
import { TarefaService } from '../../services/tarefa.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tarefa-list',
  standalone: true,
  imports: [CommonModule, MatTableModule,MatSlideToggleModule, MatExpansionModule ],
  templateUrl: './tarefa-list.component.html',
  styleUrl: './tarefa-list.component.css'
})
export class TarefaListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'titulo', 'descricao'];
  dataSource: Tarefa[] = [];
  readonly panelOpenState = signal(false);
  
  constructor(private tarefaService: TarefaService) {}

  ngOnInit(): void {
    this.getTarefas();
  }

  getTarefas(): void {
    this.tarefaService.getAll().subscribe(tarefas => { 
      console.log(tarefas[0].id);
      this.dataSource = tarefas;
    });
  }

}
