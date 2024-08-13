import { Routes } from '@angular/router';
import { TarefaListComponent } from './components/tarefa-list/tarefa-list.component';

export const routes: Routes = [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: TarefaListComponent },
];
