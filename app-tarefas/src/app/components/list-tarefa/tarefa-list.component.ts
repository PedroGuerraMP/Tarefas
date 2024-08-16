import { Component, OnInit, signal } from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';


import { Tarefa, EnumStatusTarefa } from '../../models/tarefa.model';
import { TarefaService } from '../../services/tarefa.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tarefa-list',
  standalone: true,
  imports: [
    CommonModule, 
    MatTableModule,
    MatSlideToggleModule, 
    MatExpansionModule, 
    MatButtonToggleModule, 
    FormsModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './tarefa-list.component.html',
  styleUrl: './tarefa-list.component.css'
})
export class TarefaListComponent implements OnInit {

  
  readonly panelOpenState = signal(false);
  selectedFilter?: string = "";
  tarefaDataSource: Tarefa[] = [];
  filtrosDataSource: Map<string, string> = new Map([
    [ "id", "Id" ],
    [ "titulo", "Título" ],
    [ "data_vencimento", "Data de Vencimento" ],
    [ "status", "Status" ],
  ]);
  
  constructor(private _tarefaService: TarefaService) {}

  ngOnInit(): void {
    this.getTarefas();
  } 

  filtroTarefaChange(tarefaProp: string): void {
    this.tarefaDataSource.sort((a:Tarefa, b:Tarefa) => {
      switch (tarefaProp) {
        case "id":
          if( a.id == null || b.id == null)
            return 0;
          else          
          return a.id < b.id? -1 : 1;
        break;

        case "titulo":
          if( a.titulo == null || b.titulo == null)
            return 0;
          else          
          return a.titulo < b.titulo? -1 : 1;
        break;

        case "data_vencimento":
          if( a.data_vencimento == null || b.data_vencimento == null)
            return 0;
          else          
          return a.data_vencimento < b.data_vencimento? -1 : 1;
        break;

        case "status":
          if( a.status == null || b.status == null)
            return 0;
          else          
          return a.status <= b.status? -1 : 1;
        break;
      
        default:
          return 0;
          break;
      }
    })
  }

  getEnumStatus(status?: number) {
    return (status == undefined) ? "" : EnumStatusTarefa[status];
  }

  deleteOnClick(id: number) {
    this.deleteTarefa(id);
  }
  
  private deleteTarefa(id:number) {
    this._tarefaService.delete(id).subscribe(tarefa => { 
      this.getTarefas();
    });
  }

  private getTarefas(): void {
    this._tarefaService.getAll().subscribe(tarefas => { 
      this.tarefaDataSource = tarefas;
    });
  }

}
