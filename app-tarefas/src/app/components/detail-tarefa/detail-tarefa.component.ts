import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

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
  providers: [provideNativeDateAdapter()],
  templateUrl: './detail-tarefa.component.html',
  styleUrl: './detail-tarefa.component.css'
})
export class DetailTarefaComponent {
  tarefaFormGroup = new FormGroup({
    id: new FormControl(''),
    titulo: new FormControl(''),
    descricao: new FormControl(''),
    data_vencimento: new FormControl(''),
    status: new FormControl(''),
  });
}
