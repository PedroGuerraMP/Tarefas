import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { NgToastModule, NgToastService } from 'ng-angular-popup'
import moment from 'moment';

import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TarefaService } from '../../services/tarefa.service';
import { Observable } from 'rxjs';
import { Tarefa } from '../../models/tarefa.model';


@Component({
  selector: 'app-detail-tarefa',
  standalone: true,
  imports: [ 
    FormsModule, 
    ReactiveFormsModule, 
    MatInputModule, 
    MatFormFieldModule,
    MatRadioModule,
    MatDatepickerModule,
    NgToastModule,
  ],
  providers: [provideNativeDateAdapter(), { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }],
  templateUrl: './detail-tarefa.component.html',
  styleUrl: './detail-tarefa.component.css'
})
export class DetailTarefaComponent { 
  constructor(private tarefaService: TarefaService, private activatedRoute: ActivatedRoute, private router: Router, private toast: NgToastService){  }
  
  pageTitle: string = "";
  tarefa$?: Observable<Tarefa>;
  tarefaIsValid: boolean = false;
  tarefaFormGroup = new FormGroup({
    id: new FormControl(''),
    titulo: new FormControl(''),
    descricao: new FormControl(''),
    data_vencimento: new FormControl(new Date()),
    status: new FormControl(0),
  });
  
  ngOnInit(){
    this.activatedRoute.title.subscribe((event) => {
      this.pageTitle = event? event : "";
    });

    this.activatedRoute.params.subscribe((event)=> {
      if(event['id']!){
        this.tarefaService.get(event['id']).subscribe((tarefa) => {
          this.setTarefaFormGroupValue(tarefa);
        })
      }

    });
  }

  saveOnClick() {
    if(!this.tarefaFormGroup.valid)
      return;
    
    if(this.tarefaFormGroup.value["id"] != '')
      this.editTarefa();
    else
      this.createTarefa();
  }

  createTarefa() {
    this.tarefaService.post({
      titulo: this.tarefaFormGroup.value["titulo"]?.toString(),
      descricao: this.tarefaFormGroup.value["descricao"]?.toString(),
      data_vencimento: this.tarefaFormGroup.value["data_vencimento"]?.toISOString(),
      status: this.tarefaFormGroup.value["status"]? 
                parseInt(this.tarefaFormGroup.value["status"].toString()) : 0,
    }).subscribe({
      error: (e) => this.toast.danger("Erro desconhecido."),
      complete: () => { 
        this.toast.success("Tarefa Salva.");
        setInterval( () =>this.router.navigate(['/list']), 500)
      }
    });
  }

  editTarefa() {
    throw new Error('Method not implemented.');
  }

  private setTarefaFormGroupValue(tarefa: Tarefa) {
    this.tarefaFormGroup.setValue({
      id: (tarefa.id ? tarefa.id : 0).toString(),
      titulo: tarefa.titulo ? tarefa.titulo : "",
      descricao: tarefa.descricao ? tarefa.descricao : "",
      data_vencimento: moment(tarefa.data_vencimento ? tarefa.data_vencimento : moment.now()).toDate(),
      status: tarefa.status ? tarefa.status.valueOf() : 0
    });
  }

}

