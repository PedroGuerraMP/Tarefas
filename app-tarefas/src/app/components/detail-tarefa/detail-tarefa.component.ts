import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { Component, ElementRef, Input } from '@angular/core';
import { ActivatedRoute, provideRouter, Router, withComponentInputBinding } from '@angular/router';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import { TarefaService } from '../../services/tarefa.service';
import { Observable } from 'rxjs';
import { Tarefa } from '../../models/tarefa.model';

import moment from 'moment';

@Component({
  selector: 'app-detail-tarefa',
  standalone: true,
  imports: [ 
    FormsModule, 
    ReactiveFormsModule, 
    MatInputModule, 
    MatFormFieldModule,
    MatRadioModule,
    MatDatepickerModule
  ],
  providers: [provideNativeDateAdapter(), { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }],
  templateUrl: './detail-tarefa.component.html',
  styleUrl: './detail-tarefa.component.css'
})
export class DetailTarefaComponent {
saveTarefa() {
throw new Error('Method not implemented.');
}
  
  constructor(private tarefaService: TarefaService, private route: ActivatedRoute){  }
  
  tarefaFormGroup = new FormGroup({
    id: new FormControl(''),
    titulo: new FormControl(''),
    descricao: new FormControl(''),
    data_vencimento: new FormControl(new Date()),
    status: new FormControl(''),
  });
  
  pageTitle: string = "";
  tarefa$?: Observable<Tarefa>;

  ngOnInit(){
    this.route.title.subscribe((event) => {
      this.pageTitle = event? event : "";
    });

    this.route.params.subscribe((event)=> {
      this.tarefaService.get(event['id']).subscribe((tarefa) => {
        this.tarefaFormGroup.setValue({
          id: (tarefa.id? tarefa.id : 0).toString(),
          titulo: tarefa.titulo? tarefa.titulo : "",
          descricao: tarefa.descricao? tarefa.descricao : "",
          data_vencimento: moment(tarefa.data_vencimento? tarefa.data_vencimento : moment.now()).toDate(),
          status: tarefa.status? tarefa.status.valueOf().toString() : '0'
        });
        
      })
    });
  }

}
