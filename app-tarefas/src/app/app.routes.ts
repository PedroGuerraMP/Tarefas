import { Routes } from '@angular/router';
import { TarefaListComponent } from './components/list-tarefa/tarefa-list.component';
import { DetailTarefaComponent } from './components/detail-tarefa/detail-tarefa.component';

export const routes: Routes = [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: TarefaListComponent },
    { path: 'add', component: DetailTarefaComponent, title: "Adicionar" },
    { path: 'edit/:id', component: DetailTarefaComponent, title: "Editar" },
];