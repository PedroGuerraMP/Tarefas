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
  constructor(
    private _tarefaService: TarefaService, 
    private _activatedRoute: ActivatedRoute, 
    private _router: Router, 
    private _toastService: NgToastService){  }
  
  pageTitle: string = "";
  tarefaIsValid: boolean = false;
  tarefaFormGroup = new FormGroup({
    id: new FormControl(''),
    titulo: new FormControl(''),
    descricao: new FormControl(''),
    data_vencimento: new FormControl(new Date()),
    status: new FormControl(0),
  });
  
  ngOnInit(){
    this._activatedRoute.title.subscribe(event => this.pageTitle = event? event : "");
    this._activatedRoute.params.subscribe((event)=> {
      if(event['id'])
        this.getTarefa(event['id']);
    });
  }

  saveOnClick() {
    if(!this.tarefaFormGroup.valid)
      return;
    
    const tarefa: Tarefa = {
      id: parseInt(this.tarefaFormGroup.value["id"]? this.tarefaFormGroup.value["id"] : '0'),
      titulo: this.tarefaFormGroup.value["titulo"]?.toString(),
      descricao: this.tarefaFormGroup.value["descricao"]?.toString(),
      data_vencimento: this.tarefaFormGroup.value["data_vencimento"]?.toISOString(),
      status: this.tarefaFormGroup.value["status"]? 
                parseInt(this.tarefaFormGroup.value["status"].toString()) : 0,
    };

    if(this.tarefaFormGroup.value["id"] != '')
      this.editTarefa(tarefa);
    else
      this.createTarefa(tarefa);
  }
  
  private getTarefa(id: number) {
    this._tarefaService.get(id).subscribe(
      tarefa => this.setTarefaFormGroupValue(tarefa)
    );
  }

  private createTarefa(tarefa:Tarefa) {
    this._tarefaService.post(tarefa).subscribe({
      error: (e) => this._toastService.danger("Erro desconhecido."),
      complete: () => { 
        this._toastService.success("Tarefa Salva.");
        setTimeout(() => this._router.navigate(['/list']), 2000)
      }
    });
  }

  private editTarefa(tarefa:Tarefa) {
    this._tarefaService.put(tarefa).subscribe({
      error: (e) => this._toastService.danger("Erro desconhecido."),
      complete: () => { 
        this._toastService.success("Tarefa Salva.");
        setTimeout(() => this._router.navigate(['/list']), 2000)
      }
    });
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

