import { Tarefa } from "../models/tarefa.model";

export const mock_tarefa_list: Tarefa[] = [
    {
        id: 0, 
        status: 2, 
        data_vencimento: '2024-08-13', 
        descricao:'Tarefa Modelo 1', 
        titulo: 'Titulo Modelo 1'
    },
    {
        id: 1, 
        status: 1, 
        data_vencimento: '2024-08-14', 
        descricao:'Tarefa Modelo 2', 
        titulo: 'Titulo Modelo 2'
    },
    {
        id: 2, 
        status: 0, 
        data_vencimento: '2024-08-15', 
        descricao:'Tarefa Modelo 3', 
        titulo: 'Titulo Modelo 3'
    },
]